import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {Keys} from "../constants/Keys";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = this.storageService.getValue(Keys.LOGGED_IN) == 'true';

    if (!isLoggedIn)
      await this.router.navigate(['/login'], {queryParams: {'redirectUrl': state.url}});

    return isLoggedIn;
  }
}
