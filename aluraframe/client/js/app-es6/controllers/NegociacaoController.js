import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoController{

    constructor() {

    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacaoesView')),
            'adiciona', 'esvazia');
    
        this._mensagemView = 

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        //this._ordemAtual = '';
        this._init();   
    }

    _init() {

        new NegociacaoService()
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {

        event.preventDefault();

        /*ConnectionFactory
            .getConnection()
            .then(connection => {*/

        let negociacao = this._criaNegociacao();

        
        new NegociacaoService()
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
        
                    
                /*
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociacao adicionada com sucesso';
                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro);*/
    }

    importaNegociacoes() {

        new NegociacaoService()
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociacoes do periodo importadas'
            }))
         .catch(error => this._mensagem.texto = error);
    }

    apaga() {

        new NegociacaoService()
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }      
    
  _criaNegociacao(){
      return new Negociacao(
          DateHelper.textoParaData(this._inputData.value),
          parseInt(this._inputQuantidade.value),
          parseFloat(this._inputValor.value));
  }

  _limpaFormulario(){
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0.0;

      this._inputData.focus();
  }
}
