import { LoginComponent } from '../src/app/login/login.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../src/app/services/storage.service";
import {Keys} from "../src/app/constants/Keys";
import {anything, deepEqual, instance, mock, verify, when} from "ts-mockito";
import {suite, test} from "mocha-typescript";

@suite()
export class LoginComponentSpec {
  private formBuilder: FormBuilder;
  private router: Router;
  private storageService: StorageService;
  private loginComponent: LoginComponent;

  constructor() {
    this.storageService = mock(StorageService);
    this.router = mock(Router);
    this.formBuilder = mock(FormBuilder);

    this.loginComponent = new LoginComponent(instance(this.formBuilder), instance(this.router), instance(this.storageService));
  }

  @test
  public async shouldLoginForRightCredentialsAndSaveStateToStorageAndRedirectToHome(): Promise<void> {
    // Arrange
    const formGroup = mock(FormGroup);
    const formControlUserName = new FormControl('admin');
    const formControlPassword = new FormControl('admin');
    when(formGroup.controls).thenReturn({
      userName: formControlUserName,
      password: formControlPassword
    });

    when(this.formBuilder.group(anything())).thenReturn(instance(formGroup));
    this.loginComponent = new LoginComponent(instance(this.formBuilder), instance(this.router), instance(this.storageService));

    // Act
    await this.loginComponent.submit();

    // Assert
    verify(this.storageService.setValue(anything(), anything())).once();
    verify(this.router.navigate(deepEqual(['/home']))).once();
  }
}
