import {compile as compilePug} from 'pug';

export const requestResetEmailEmailTemplate = compilePug(`
doctype 5
html(lang='fa')
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
        padding: 8px 20px;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        outline: none;
        text-align: center;
        background-color: #00AEFF;
        color: #F8F7FF;
      }
      
      .center {
        text-align: center;
      }
  body
    .logo-container
      a(href=home_page): img.logo(src=logo)
      div میزانسن 
    div .ایمیل خود را بازنشانی کنید
    .center 
      a(href=reset_url): button.button.center بازنشانی ایمیل
`);

export interface RequestResetEmailEmailTemplateVariables {
	home_page: string;
	logo: string;
	reset_url: string;
}
