import { BehaviorSubject } from 'rxjs';

export interface CustomFormItemInfo {
  key: string;
  formType: string;
  title: string;
  constraint:
    | StringInputConstraint
    | NumberInputConstraint
    | ImgInputConstraint
    | FileInputConstraint
    | SelectInputConstraint
    | DateInputConstraint;
}

export type CustomFormItemInfos = CustomFormItemInfo[];

export interface StringInputConstraint {
  required: boolean;
  placeholder: string;
  startwith?: string;
  password?: boolean;
  minlength?: number;
  maxlength?: number;
}

export interface NumberInputConstraint {
  required: boolean;
  addOnBefore: string;
  startwith?: number;
}

export interface ImgInputConstraint {
  required: boolean;
}

export interface FileInputConstraint {
  required: boolean;
}

export interface SelectOption {
  value: number | string; // 如果选中，返回的值
  label: string; // 显示的名字
}

export interface SelectInputConstraint {
  required: boolean;
  placeholder: string;
  options: SelectOption[];
  startwith?: number | string;
  disabled?: boolean;
}

export interface DateInputConstraint {
  required: boolean;
}

export type StringInputRes = string | null;
export type NumberInputRes = number | null;
export type ImgInputRes = File[] | null;
export type FileInputRes = File[] | null;
export type SelectInputRes = number | string | null;
export type DateInputRes = Date | null;

export class CustomFormItem {
  public data$;

  constructor(public metaInfo: CustomFormItemInfo) {
    switch (metaInfo.formType) {
      case 'string':
        this.data$ = new BehaviorSubject<StringInputRes>(null);
        break;
      case 'number':
        this.data$ = new BehaviorSubject<NumberInputRes>(null);
        break;
      case 'img':
        this.data$ = new BehaviorSubject<ImgInputRes>(null);
        break;
      case 'file':
        this.data$ = new BehaviorSubject<FileInputRes>(null);
        break;
      case 'select':
        this.data$ = new BehaviorSubject<SelectInputRes>(null);
        break;
      case 'date':
        this.data$ = new BehaviorSubject<DateInputRes>(null);
        break;
      default:
        this.data$ = new BehaviorSubject<string>('');
    }
  }
}

export type CustomFormItems = CustomFormItem[];

export interface CustomFormItemData {
  key: string;
  value:
    | StringInputRes
    | NumberInputRes
    | ImgInputRes
    | FileInputRes
    | DateInputRes;
}

export type CustomFormData = CustomFormItemData[];
