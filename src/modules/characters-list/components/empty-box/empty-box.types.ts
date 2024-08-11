export interface EmptyBoxInfo{
  title: string;
  subTitle: string;
  action?: ActionEmptyInfo
}

interface ActionEmptyInfo {
  label: string;
  route: string;
}