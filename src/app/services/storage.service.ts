import {Injectable} from "@angular/core";
import {Keys} from "../constants/Keys";

@Injectable()
export class StorageService {
  public getValue(key: Keys): string {
    return localStorage.getItem(key.toString());
  }

  public setValue(key: Keys, value: Object): void {
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }
}
