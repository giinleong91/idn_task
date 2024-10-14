import { defineStore } from 'pinia'

export const userStore = defineStore('user',{
    state: () => {
        return {
           fullname: '',
           surname: '',
           username: '',
           email: '',
           password: '',
           identification: '',
           phone: '',
           secquestion: '',
           secanswer: '',
           method: '',
           terms:'',
        }
    }
})
