import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class NutricaoService {

    constructor(
        private _api: ApiService
    ) {

    }

    getNutricoes(filtros: any): Observable<any> {

        // return this._api.get('/nutricao/lista', filtros);

        // TODO: TESTE
        let rows = [];

        for (let i = 0; i < 20; i++) {
            
            rows.push({
                id: i,
                ativo: true,
                tipo: eArtigo.NUTRICAO,
                imagemCapa: 'assets/nutricao/n1.png',
                titulo: `${i} Uma alimentação saudável daeiudhaeuid adiuaehduiaed naueh`,
                texto: `
                    <p>A relação entre nutrição e câncer é complexa e de grande importância. Uma alimentação saudável desempenha um papel fundamental na prevenção e no manejo do câncer. Uma dieta rica em frutas, vegetais, grãos integrais e proteínas magras pode fornecer nutrientes essenciais e antioxidantes que ajudam a fortalecer o sistema imunológico e reduzir o risco de desenvolver câncer.</p>
                    <p>Certos alimentos também foram associados a um risco reduzido de câncer, enquanto outros, como alimentos processados, ricos em gordura saturada e açúcares adicionados, podem aumentar o risco. Além disso, manter um peso saudável através da dieta e do exercício físico pode ajudar a diminuir o risco de certos tipos de câncer, como câncer de mama, cólon e próstata.</p>
                    <p>No entanto, é importante ressaltar que a nutrição sozinha não é uma cura para o câncer. É essencial que os pacientes em tratamento contra o câncer recebam orientação nutricional adequada para ajudar a manter a força física, otimizar a resposta ao tratamento e reduzir os efeitos colaterais. Uma dieta equilibrada pode desempenhar um papel de apoio importante no enfrentamento da doença, juntamente com o tratamento médico adequado e o apoio emocional.</p>
                `,
                telaPrincipal: true,
                dataInclusao: '2024-04-16T01:21:44.380Z'
            })

        }

        return of({
            rows: rows.splice(
                filtros.offset,
                filtros.limit
            ),
            count: 20
        })

    }

    getNutricao(id: number): Observable<any> {

        // return this._api.get('/nutricao/get', { id });

        // TODO: TESTE
        return of({
            id: 1,
            ativo: true,
            tipo: eArtigo.NUTRICAO,
            imagemCapa: 'assets/nutricao/n1.png',
            titulo: `${1} Uma alimentação saudável daeiudhaeuid adiuaehduiaed naueh`,
            texto: `
                <p>A relação entre nutrição e câncer é complexa e de grande importância. Uma alimentação saudável desempenha um papel fundamental na prevenção e no manejo do câncer. Uma dieta rica em frutas, vegetais, grãos integrais e proteínas magras pode fornecer nutrientes essenciais e antioxidantes que ajudam a fortalecer o sistema imunológico e reduzir o risco de desenvolver câncer.</p>
                <p>Certos alimentos também foram associados a um risco reduzido de câncer, enquanto outros, como alimentos processados, ricos em gordura saturada e açúcares adicionados, podem aumentar o risco. Além disso, manter um peso saudável através da dieta e do exercício físico pode ajudar a diminuir o risco de certos tipos de câncer, como câncer de mama, cólon e próstata.</p>
                <p>No entanto, é importante ressaltar que a nutrição sozinha não é uma cura para o câncer. É essencial que os pacientes em tratamento contra o câncer recebam orientação nutricional adequada para ajudar a manter a força física, otimizar a resposta ao tratamento e reduzir os efeitos colaterais. Uma dieta equilibrada pode desempenhar um papel de apoio importante no enfrentamento da doença, juntamente com o tratamento médico adequado e o apoio emocional.</p>
            `,
            telaPrincipal: true,
            dataInclusao: '2024-04-16T01:21:44.380Z'
        })

    }

    salvarNutricao(dados: any): Observable<any> {

        return this._api.post('/nutricao/save', dados);

    }

    deleteNutricao(dados: any): Observable<any> {

        return this._api.post('/nutricao/delete', dados);

    }

}