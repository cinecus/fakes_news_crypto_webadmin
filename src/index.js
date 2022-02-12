import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { ArticleProvider } from './context/article_context'
import { AuthProvider } from './context/auth_context'

ReactDOM.render(
  <AuthProvider>
    <ArticleProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </ArticleProvider>
  </AuthProvider>
  ,
  document.getElementById('root')
);

