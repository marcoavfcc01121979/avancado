class NegociacaoController{

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
    
  }

  adiciona(event){
    event.preventDefault();

    //console.log(typeof(this._inputData.value));

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociacao adicionada com sucesso';
    this._limpaFormulario();


    //console.log(negociacao);
    //adiciona a negociacao em uma lista
    }

    importaNegociacoes() {
        let service = new NegociacaoService();
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if (erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociacao importadas com sucesso';

        });
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociacoes apagadas com sucesso';
    }      
    
  _criaNegociacao(){
      return new Negociacao(
          DateHelper.textoParaData(this._inputData.value),
          this._inputQuantidade.value,
          this._inputValor.value);
  }

  _limpaFormulario(){
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0.0;

      this._inputData.focus();
  }
}
