import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ListService} from "../services/list.service";

@Injectable({
  providedIn: 'root'
})

export class ListOptionsResolver implements Resolve<Observable<any>> {
  constructor(private listService: ListService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.listService.getListsByUserId(route.paramMap.get('id'));
  }
}
