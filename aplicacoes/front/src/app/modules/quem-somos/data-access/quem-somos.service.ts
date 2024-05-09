import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class QuemSomosService {

    constructor(
        private _api: ApiService
    ) {

    }

    getQuemSomos(): Observable<any> {

        return of({
            texto: `
                <p>A Associação Acolhendo a Dor com Amor é uma organização de sociedade civil filantrópica/beneficente que foi fundada em 2018 pela psico-oncologista, Adriane Pedrosa, que possui mais de 20 anos de experiência em auxiliar e acompanhar pacientes em tratamento oncológico e familiar. Oficialmente a instituição foi registrada em 27 de Janeiro de 2020.</p>
                <p>O foco da instituição é promover atividades sócio-psicoemocionais, passar informações e devolver nas pessoas marcadas pelo câncer a autoestima, autonomia, autoconfiança, dignidade, reabilitação e redirecionamento de sua história, possibilitando a construção de um momento mais harmônico e leve diante do peso e fragilidade da vida com câncer.</p>
                <br><br>
                <p>Formas de ajudar:</p>
                <p>Você pode ajudar a instituição através de doações financeiras, de alimentos, produtos de limpeza e saúde.</p>
                <p>Caso tenha uma formação que contribua com a nossa missão, estamos abertos à profissionais qualificados que queiram nos ajudar nesta missão.</p>
            `
        });

    }

}