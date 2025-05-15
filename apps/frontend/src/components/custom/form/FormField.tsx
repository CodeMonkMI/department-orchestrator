// Field type
/**
 * Field Type
 *  input
 *  textarea
 *  select
 *
 *
 *
 */

import { InputHTMLAttributes } from "react";

type BaseFormField = {
  name: string;
  label: string;
};

type InputFormField = BaseFormField & {
  type: "input";
  value: string;
  attributes?: InputHTMLAttributes<HTMLInputElement>;
};
type TextareaFormField = BaseFormField & {
  type: "textarea";
  value: string;
  attributes?: InputHTMLAttributes<HTMLTextAreaElement>;
};
type SelectItem = {
  label: string;
  value: string;
};
type SelectFormField = BaseFormField & {
  type: "select";
  values: SelectItem[];
  firstLabel?: string;
  attributes?: InputHTMLAttributes<HTMLTextAreaElement>;
};

export type FormField = InputFormField | SelectFormField | TextareaFormField;
