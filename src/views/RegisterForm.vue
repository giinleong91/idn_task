<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'

const registerForm = ref(null)
const router = useRouter()
const route = useRoute()
const formData = ref({
    fullname: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    reenterpassword: '',
})

const data = reactive({
    type: '',
    input: '',
})

const schema = yup.object({
    fullname: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(8),
    repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function handleSubmit(data: any){
    console.log(JSON.stringify(data))
    // router.push('step2')
}

function showPassword(el: any){
    const input = document.getElementById(el)
    if(input.type === 'password'){
        input.type = 'text'
        data.input = el
        data.type = 'active'
    }else{
        input.type = 'password'
        data.type = ''
    }
}
</script>
<template>
    <div class="row">
        <div class="col">
            <Form @submit="handleSubmit" ref="registerForm" class="form-inline" id="registerForm" :validation-schema="schema" :initial-values="formData">
                <div class="form-group row align-items-center">
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-person-vcard-fill"></i></div>
                            </div>
                            <Field name="fullname" placeholder="Your Name" />
                        </div>
                        <ErrorMessage name="fullname" class="alertMsg"/>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-person-vcard-fill"></i></div>
                            </div>
                            <Field name="surname" placeholder="Your Surname" />
                        </div>
                        <ErrorMessage name="surname" class="alertMsg"/>
                    </div>
                </div>
                <div class="form-group row align-items-center">
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                            </div>
                            <Field name="username" placeholder="Your Username" />
                        </div>
                        <ErrorMessage name="username" class="alertMsg"/>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div>
                            </div>
                            <Field name="email" placeholder="Your Email" />
                        </div>
                        <ErrorMessage name="email" class="alertMsg"/>
                    </div>
                </div>
                <div class="form-group row align-items-center">
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                            </div>
                            <Field name="password" id="password" type="password" placeholder="Your Password"/>
                            <div class="input-group-append pointer" @click="showPassword('password')">
                                <div class="input-group-text">
                                    <img v-if="data.type && data.input === 'password'" alt="eye-slash" class="logo" src="@/assets/icon/eye.svg" width="16" height="24" />
                                    <img v-else alt="eye" class="logo" src="@/assets/icon/eye-slash.svg" width="16" height="24" />
                                </div>
                            </div>
                        </div>
                        <ErrorMessage name="password" class="alertMsg"/>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                            </div>
                            <Field name="repassword" id="repassword" type="password" placeholder="Reenter Password"/>
                            <div class="input-group-append pointer"  @click="showPassword('repassword')">
                                <div class="input-group-text">
                                    <img v-if="data.type && data.input === 'repassword'" alt="eye-slash" class="logo" src="@/assets/icon/eye.svg" width="16" height="24" />
                                    <img v-else alt="eye" class="logo" src="@/assets/icon/eye-slash.svg" width="16" height="24" />
                                </div>
                            </div>
                        </div>
                        <ErrorMessage name="repassword" class="alertMsg"/>
                    </div>
                </div>
                <div class="col-12 mx-auto mt-3 text-center">
                    <button type="submit" id="submit" class="btn btn-success">
                        GO TO NEXT STEP
                    </button>
                </div>

            </Form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#registerForm{
    background-color: #f2f2f2;
    border-radius: 25px;
    padding: 1em 3em;
    min-width: 810px;
    .pointer{
        cursor: pointer;
    }
    .input-group{
        border: 1px solid #dee2e6;
        border-radius: 25px;
        input{
            width: 88.5%;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
            border: 0;
            border-left: 1px solid #dee2e6;
            padding-left: 10px;
        }
        #password, #repassword{
            width: 77%;
        }
    }
    .input-group-text{
        border: none;
        border-radius: 25px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: #fff;
    }
    .form-control{
        border: none;
        border-radius: 25px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    #password, #repassword{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .pointer{
        .input-group-text{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
        }
    }
    #submit{
        width: 100%;
        border-radius: 25px;
    }
    .alertMsg{
        position: absolute;
        margin-top: -20px;
        color: red;
    }
}
</style>