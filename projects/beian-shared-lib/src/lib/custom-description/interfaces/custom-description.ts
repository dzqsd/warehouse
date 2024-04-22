export interface CustomDescriptionItemInfo {
  key: string;
  descriptionType: string;
  description: StringDescription | ImgDescription | FileDescription;
}

export type CustomDescriptionItemInfos = CustomDescriptionItemInfo[];

export interface StringDescription {
  title: string;
  value: string;
}

export interface ImgDescription {
  title: string;
  value: { name: string; src: string }[];
}

export interface FileDescription {
  title: string;
  value: { name: string; src: string }[];
}

export interface TimeDescription {
  title: string;
  value: string;
}

export function makeStringDescription(
  key: string,
  title: string,
  value: string,
): CustomDescriptionItemInfo {
  return {
    key: key,
    descriptionType: 'string',
    description: {
      title: title,
      value: value,
    },
  };
}

export function makeImgDescription(
  key: string,
  title: string,
  items: { name: string; src: string }[],
): CustomDescriptionItemInfo {
  return {
    key: key,
    descriptionType: 'img',
    description: {
      title: title,
      value: items,
    },
  };
}

export function makeFileDescription(
  key: string,
  title: string,
  items: { name: string; src: string }[],
): CustomDescriptionItemInfo {
  return {
    key: key,
    descriptionType: 'file',
    description: {
      title: title,
      value: items,
    },
  };
}

export function makeTimeDescription(
  key: string,
  title: string,
  value: string,
): CustomDescriptionItemInfo {
  return {
    key: key,
    descriptionType: 'time',
    description: {
      title: title,
      value: value,
    },
  };
}
