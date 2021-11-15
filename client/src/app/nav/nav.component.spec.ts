import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import {Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { NavComponent} from "./nav.component";


describe('NavComponent', () => {
    const fakeAccountService = jasmine.createSpyObj(
  
      
      'AccountService',
  
      ['setCurrentUser', 'method2']
  
    );
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule,RouterTestingModule,ToastrModule.forRoot()],
            declarations: [NavComponent] ,
            providers: [

                {
        
                  provide: AccountService,
        
                  useValue: fakeAccountService,

                },
                ToastrService
            ],
        });

        // create component and test fixture
        fixture = TestBed.createComponent(NavComponent);

        // get test component from the fixture
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('username field validity', () => {
        let errors = {};
        let username = component.form.controls[''];
        expect(username.valid).toBeFalsy();

        // Username field is required
        errors = username.errors || {};
        expect(errors as any['required']).toBeTruthy();

        // Set username to something
        username.setValue("test");
        errors = username.errors || {};
        expect(errors as any['required']).toBeFalsy();
        expect(errors as any['pattern']).toBeTruthy();

        // Set username to something correct
        username.setValue("abc");
        errors = username.errors || {};
        expect(errors as any['required']).toBeFalsy();
        expect(errors as any['pattern']).toBeFalsy();
    });

    it('password field validity', () => {
        let errors = {};
        let password = component.form.controls['pa$$w0rd'];

        // Username field is required
        errors = password.errors || {};
        expect(errors as any['required']).toBeTruthy();

        // Set username to something
        password.setValue("Pa$$w0rd");
        errors = password.errors || {};
        expect(errors as any['required']).toBeFalsy();
        expect(errors as any['minlength']).toBeTruthy();

        // Set username to something correct
        password.setValue("Pa$$w0rd");
        errors = password.errors || {};
        expect(errors as any['required']).toBeFalsy();
        expect(errors as any['minlength']).toBeFalsy();
    });

    it('submitting a form emits a user', () => {
        fixture.detectChanges();
        expect(component.form.valid).toBeFalsy();
        component.form.controls['username'].setValue("");
        component.form.controls['password'].setValue("Pa$$w0rd");
        expect(component.form.valid).toBeTruthy();

        let user: User;
        // Subscribe to the Observable and store the user in a local variable.
        component.loggedIn.subscribe((value: any) => user = value);

        // Trigger the login function
        component.login();

        // Now we can check to make sure the emitted value is correct
        expect(user!.username).toBe("");
        expect(user!.password).toBe("Pa$$w0rd");
});
});
