import { IBaseSelector } from "./IBaseSelector";
export abstract class BaseSelector<TDelegate>
  implements IBaseSelector<TDelegate>
{
  base: { [key in keyof TDelegate]: boolean } = this.getBase();
  find: { [key in keyof TDelegate]: boolean } = this.getBase();
  findOne: { [key in keyof TDelegate]: boolean } = this.getBase();
  findById: { [key in keyof TDelegate]: boolean } = this.getBase();
  create: { [key in keyof TDelegate]: boolean } = this.getBase();
  update: { [key in keyof TDelegate]: boolean } = this.getBase();
  delete: { [key in keyof TDelegate]: boolean } = this.getBase();

  abstract getBase();
}
