<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup'

const validateForm = ref(null)
const formData = ref({
    identification: '',
    phone: '',
    secquestion: '',
    secanswer: '',
    method: '1',
    terms: null,
})

const schema = yup.object({
    identification: yup.string().required('Identification Number is required'),
    phone: yup.string().required('Phone Number is required'),
    secquestion: yup.string().required('Security Question is required'),
    secanswer: yup.string().required('Security Question is required'),
    method: yup.string().required('Login Setup Menu Method is required'),
    terms: yup.string().required('Terms & Conditions is required'),
})

const data = reactive({
    popup: false,
    msg: ''
})

function handleSubmit(data :any){
    console.log(JSON.stringify(data))
    data.popup = true
    data.msg = 'Form has been successfully submitted.'
}

</script>
<template>
    <div class="row">
        <div class="col">
            <div class="alert alert-success" role="alert" v-show="data.popup">
                {{ data.msg }}
            </div>
            <Form @submit="handleSubmit" ref="validateForm" class="form-inline" id="validateForm" :validation-schema="schema" :initial-values="formData">
                <div class="form-group row align-items-center">
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-person-vcard-fill"></i></div>
                            </div>
                            <Field name="identification" placeholder="Identification Number"/>
                        </div>
                        <ErrorMessage name="identification" class="alertMsg"/>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-phone-fill"></i></div>
                            </div>
                            <Field name="phone" placeholder="Phone Number"/>
                        </div>
                        <ErrorMessage name="phone" class="alertMsg"/>
                    </div>
                </div>
                <div class="form-group row align-items-center">
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-shield-fill"></i></div>
                            </div>
                            <Field name="secquestion" placeholder="Security Question"/>
                        </div>
                        <ErrorMessage name="secquestion" class="alertMsg"/>
                    </div>
                    <div class="col-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="bi bi-shield-fill-check"></i></div>
                            </div>
                            <Field name="secanswer" placeholder="Security Answer"/>
                        </div>
                        <ErrorMessage name="secanswer" class="alertMsg"/>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <div class="card-header text-center">
                            LOGIN SETUP MENU
                        </div>
                        <div class="card-body radio_box">
                            <span>
                                <Field v-slot="{ field }" name="method" type="radio" value="1">
                                    <label>
                                        <input type="radio"  v-bind="field" value="1" />
                                        <div class="radioBtn" />
                                        Activate login via email
                                    </label>
                                </Field>
                            </span>
                            <span>
                                <Field v-slot="{ field }" name="method" type="radio" value="2">
                                    <label>
                                        <input type="radio"  v-bind="field" value="2" />
                                        <div class="radioBtn" />
                                        Activate login via SMS
                                    </label>
                                </Field>
                            </span>
                            <span>
                                <Field v-slot="{ field }" name="method" type="radio" value="0">
                                    <label>
                                        <input type="radio"  v-bind="field" value="0" />
                                        <div class="radioBtn" />
                                        Disable all
                                    </label>
                                </Field>
                            </span>
                        </div>
                    </div>
                    <div class="method">
                        <ErrorMessage name="method" class="alertMsg"/>
                    </div>
                </div>
                <div class="col-12 text-center mt-5 mb-4">
                    <div class="check_box">
                        <Field v-slot="{ field }" name="terms" type="checkbox" :value="true" :unchecked-value="false">
                            <label>
                                <input type="checkbox"  v-bind="field" :value="true" />
                                <div class="checkbox" />
                                I HAVE READ AND ACCEPT THE GENERAL <a href="#">TERMS AND CONDITIONS</a>
                            </label>
                        </Field>
                    </div>
                    <div class="terms">
                        <ErrorMessage name="terms" class="alertMsg"/>
                    </div>
                </div>
                <div class="col-12 mx-auto mt-3 text-center">
                    <button type="submit" id="submit" class="btn btn-success">
                        <i class="bi bi-send-fill"></i>
                        Register Now
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#validateForm{
    background-color: #f2f2f2;
    border-radius: 25px;
    padding: 1em 3em;
    min-width: 810px;
    input{
        width: 80%;
    }
    input[type=checkbox], input[type=radio]{
        width: auto;
    }
    .radio_box {
        input{
            display:none;
        }
        .radioBtn{
            background:url('src/assets/icon/circle.svg') no-repeat;
            height: 16px;
            width: 16px;
            display:inline-block;
            padding: 0 0 0 0px;
        }

        input:checked + .radioBtn{
            background:url('src/assets/icon/circle-dot.svg') no-repeat;
            height: 16px;
            width: 16px;
            display:inline-block;
            padding: 0 0 0 0px;
        }
    }
        .check_box {
            input{
                display:none;
            }
            .checkbox{
                background:url('src/assets/icon/hexagon.svg') no-repeat;
                height: 16px;
                width: 16px;
                display:inline-block;
                padding: 0 0 0 0px;
            }
    
            input:checked + .checkbox{
                background:url('src/assets/icon/hexagon-check.svg') no-repeat;
                height: 16px;
                width: 16px;
                display:inline-block;
                padding: 0 0 0 0px;
            }
        }

    .card{
        margin: 15px auto;
        .card-body{
            display: flex;
            span{
                flex-basis: 100% ;
                padding: 5px 15px;
                border-right: 3px solid;
                min-width: 225px;
                &:last-child{
                    border-right: 0;
                }
                input{
                    margin-right: 15px;
                }
            }
        }
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
            width: 70%;
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
    #submit{
        width: 100%;
        border-radius: 25px;
    }
    .alertMsg{
        position: absolute;
        margin-top: -20px;
        color: red;
    }
    .method{
        text-align: center;
        margin-top: -15px;
        .alertMsg{
            position: relative;
        }
    }
    .terms{
        .alertMsg{
            margin: 0;
            position: relative;
        }
    }
    #submit{
        width: 100%;
    }
}
</style>