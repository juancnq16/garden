import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent {
  id$!: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MessageService
  ) {}
  ngOnInit() {
    /**
     *  const id = this.route.snapshot.paramMap.get('id')!;
        this.hero$ = this.service.getHero(id);
        gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', {id: heroId, foo: 'foo'}]);
  }

    this.id$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        console.log(params.get('id')!))
        //this.service.getHero(params.get('id')!))
    );
     */
  }
}
