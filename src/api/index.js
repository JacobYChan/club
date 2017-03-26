import Vue from 'vue';
import axios from 'axios';
import { AjaxPlugin } from 'vux';
import store from '../store';

Vue.use(AjaxPlugin, axios);


export default {

}