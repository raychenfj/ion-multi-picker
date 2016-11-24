
export interface MultiPickerOption {
  text?: string
  value?: any;
  parentVal?: any | Array<any>;
  disabled?:boolean;
}

export interface MultiPickerColumn {
  name:string,
  options: MultiPickerOption[]
  alias?:string,
  parentCol?:string,
}
