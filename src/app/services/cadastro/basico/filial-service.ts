import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class FilialService {

    public modulo: string = 'CAD001';

    constructor(private http: HttpClient) { }
    
    /**
     * Método para definir o módulo atual
     * @param modulo string
     */
    
    setModulo(modulo: string) {
        this.modulo = modulo;       
    }

    /**
     * Método para obter o cabeçalho padrão para as requisições HTTP
     * @returns HttpHeaders
     */ 

    private getHeaders() {
        return new HttpHeaders({
            'accept': '*/*',
            'modulo': this.modulo
        });
    }

    /**
     * Método para obter a lista de filiais
     * @param filtpfil number | null
     * @returns Observable<any>
     */
    getFilialById(filtpfil: number | null): Observable<any> {

        let params = new HttpParams();

        if (filtpfil !== null && filtpfil > 0) {
            params = params.set('filtpfil', filtpfil.toString());
        }

        return this.http.get<any>(`${environment.base_url}/cadastro/filiais`, { headers: this.getHeaders(), params }).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                Swal.fire('Erro', 'Ocorreu um erro ao buscar as filiais!', error.message);
                return of([]);
            })
        );

    }

    /**
     * Método para obter a lista de filiais simples
     * @param filtpfil number | null
     * @returns Observable<any>
     */
    getFiliaisSimplesLista(filtpfil: number | null): Observable<any> {
        let params = new HttpParams();
        if (filtpfil) {
            params = params.set('filtpfil', filtpfil.toString());
        }
        return this.http.get(`${environment.base_url}/cadastro/filiais/simples`, { headers: this.getHeaders(), params }).pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                Swal.fire('Erro', 'Ocorreu um erro ao buscar as filiais!', error.message);
                return of([]);
            })
        );
    }


}
