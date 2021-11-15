import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

describe('AppComponent', () => {
  const fakeAccountService = jasmine.createSpyObj(

    
    'AccountService',

    ['setCurrentUser', 'method2']

  );
  fakeAccountService.setCurrentUser.and.returnValue({});
  const fakePresenceService = jasmine.createSpyObj(

    
    'PresenceService',

    ['createHubConnection', 'method2']

  );
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        [HttpClientTestingModule],
        [RouterTestingModule]
      ],
      declarations: [
        AppComponent
      ],
      providers: [

        {

          provide: AccountService,

          useValue: fakeAccountService,

        },
        {

          provide: PresenceService,

          useValue: fakePresenceService,

        },

      ],
      
    }).compileComponents();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('The BookStore app');
  });
});
