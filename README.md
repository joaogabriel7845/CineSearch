# 🎬 CineSearch

Uma aplicação web para descobrir e explorar filmes populares, com busca, detalhes completos e trailer integrado.

---

## ✨ Funcionalidades

- **Página inicial** com carrossel animado de filmes populares
- **Busca de filmes** por nome, com suporte a Enter ou clique no botão
- **Grid de filmes** com carregamento paginado ("Carregar Mais")
- **Página de detalhes** com:
  - Poster, backdrop, título, ano, duração e nota
  - Sinopse
  - Carrossel do elenco com foto e nome
  - Player de trailer (YouTube) em português, com fallback para inglês
- **Toast de erro** para buscas inválidas ou trailer não encontrado
- Layout totalmente **responsivo** para mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 / CSS3 / JavaScript | Base da aplicação |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Dados de filmes, elenco e trailers |
| [Swiper.js](https://swiperjs.com/) | Carrossel do elenco |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Ícones da interface |
| Google Fonts (Inter + JetBrains Mono) | Tipografia |

---

## 📁 Estrutura

```
cinesearch/
├── index.html      # Estrutura da aplicação
├── style.css       # Estilos e responsividade
├── script.js       # Lógica da aplicação
├── config.js       # Chave de API e URLs da TMDB
└── cinesearch.ico  # Favicon
```

---

## 🚀 Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaogabriel7845/cinesearch.git
   ```

2. Abra o arquivo `index.html` diretamente no navegador, ou use uma extensão como **Live Server** no VS Code.

> Não é necessário instalar dependências — todas as bibliotecas são carregadas via CDN.

---

## 🔑 Configuração da API

As credenciais da TMDB ficam no arquivo `config.js`:

```js
const API_KEY = 'sua_chave_aqui'
```

Para obter sua chave gratuita, crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e acesse **Configurações → API**.

> ⚠️ Chaves da TMDB são gratuitas e de baixo risco, mas evite commitar chaves de serviços pagos como AWS ou Stripe.

---

## 📱 Responsividade

| Breakpoint | Layout |
|---|---|
| Desktop (> 900px) | Grid 5 colunas, trailer 50vw |
| Tablet (≤ 900px) | Grid 3 colunas, trailer 80vw |
| Mobile (≤ 480px) | Grid 2 colunas, trailer 90vw |

---

## 👤 Autor

Desenvolvido por [João Gabriel](https://github.com/joaogabriel7845).
