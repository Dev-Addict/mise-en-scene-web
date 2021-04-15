import {compile as compilePug} from 'pug';

export const welcomeEmailTemplate = compilePug(`
html
  head
    link(rel='preconnect' href='https://fonts.gstatic.com')
    link(href='https://fonts.googleapis.com/css2?family=Lalezar&display=swap' rel='stylesheet')
    style(type='text/css').
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Lalezar', cursive;
      }
      
      html, body {
        background-color: #F8F7FF;
        color: #363636;
        font-size: 14px;
      }
      
      body {
        padding: 10px 20px;
        direction: rtl;
      }
      
      .logo-container {
        text-align: center;
        font-size: 20px;
      }
      
      .logo {
        width: 60px;
        height: 60px;
      }
      
      .button {
        font-size: 16px;
        \tpadding: 8px 20px;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        outline: none;
        text-align: center;
        background-color: #00AEFF;
        color: #F8F7FF;
      }
      
      .center {
        position: relative;
        right: 50%;
        transform: translateX(50%);
      }
  body
    div(class='logo-container')
      a(href='https://google.com'): img(src='https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg' class='logo')
      div میزانسن 
    div سلام به میزانسن خوش آمدید
    a(href='https://google.com'): button(class='button center') تایید ایمیل
`);
