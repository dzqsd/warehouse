import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-basic-layout-user-header',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    NzAvatarModule,
    NzSpaceModule,
    RouterLink,
  ],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.less',
})
export class UserHeaderComponent {
  constructor(private userService: UserService) {}

  public userName$: Observable<string | null> =
    this.userService.curUserInfo$.pipe(
      map((info) => {
        if (info === null) {
          return null;
        }
        return info.name;
      }),
    );

  public logout() {
    this.userService.logout();
  }
}
