import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'lib-http-img',
  standalone: true,
  imports: [CommonModule, NzImageModule],
  templateUrl: './http-img.component.html',
  styleUrl: './http-img.component.less',
})
export class HttpImgComponent implements OnInit, OnDestroy {
  @Input({ required: true }) url!: string;
  constructor(private http: HttpClient) {}

  public url$ = new AsyncSubject<string>();

  ngOnInit(): void {
    // 通过httpClient获取图片，这样拦截器可以添加header中的token。
    this.http
      .get(this.url, { responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            this.url$.next(reader.result as string);
            this.url$.complete();
          };
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.url$.subscribe((url) => {
      URL.revokeObjectURL(url);
    });
  }
}
