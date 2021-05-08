import {compile as compilePug} from 'pug';

export const requestResetEmailEmailTemplate = compilePug(`
doctype html
html(lang='en')
  head
    meta(charset='UTF-8')
    link(rel='preconnect' href='https://fonts.gstatic.com')
    link(href='https://fonts.googleapis.com/css2?family=Lalezar&display=swap' rel='stylesheet')
    style.
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Lalezar', cursive;
      color: #363636;
      transition: all 336ms;
      user-select: none;
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
      font-size: 24px;
      }
      .logo-container:hover {
      opacity: 0.5;
      }
      .logo-link {
      text-decoration: none;
      color: #363636;
      }
      .logo-text {
      margin-top: -25px;
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
      margin: 10px 0;
      }
      .button:hover {
      opacity: 0.5;
      box-shadow: 3px 0 6px 0 #00AEFF29;
      }
      .center {
      position: relative;
      right: 50%;
      transform: translateX(50%);
      }
      .message {
      padding: 10px;
      font-size: 16px;
      }
  body
    .logo-container
      a.logo-link(href=home_url)
        img.logo(src='https://www.miseenscene.ir/_next/image?url=%2Fassets%2Flogo%2Fmes-light.svg&w=128&q=75')
        .logo-text میزانسن
    .message
      | سلام #{name}
      br
      | \tما یک درخواست برای عوض کردن ایمیل دریافت کردیم.
      br
      | \tبرای تغییر اییل بر روی لینک زیر کلیک کنید.
    a(href=reset_url)
      button.button.center
        | تغییر رمز عبور
    .message
      | شما تنها ده دقیقه تا نابودی خودکار لینک تغییر ایمیل زمان دارید.
    .message
      | در صورتی که شما درخواستی مبنی بر تغییر ایمیل نداشته اید این ایمیل را نادیده بگیرید.
    .message
      | با تشکر
      br
      | \tتیم میزانسن

`);

export interface RequestResetEmailEmailTemplateVariables {
	home_page: string;
	logo: string;
	reset_url: string;
}
