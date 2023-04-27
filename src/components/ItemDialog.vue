<template>
  <div class="overlay" @click="$emit('close')">
    <div class="dialog" @click.stop>
      <div class="dialog-header"> <i
                        aria-hidden="true"
                        class="material-icons"
                      >{{ dialogTitle == 'Edit Task' ? 'edit' : 'add' }}</i>{{ dialogTitle }}</div>

      <div class="content">


<div class="input-container" v-if="dialogTitle != 'Edit Task' ">
      <label>Title</label>
      <input  class="input__field {{ titleError ? 'errorborder' : 'hhh' }}" id="title" v-model="title"  type="text" placeholder="Title "  />
      
      <div v-if="titleError" class="error">{{ titleError }}</div>
   

</div>


<div class="input-container">
  <label>Description</label>
      <input class="input__field" id="description" v-model="description"  type="text" placeholder="Description "  />
     
      <div v-if="descriptionError" class="error">{{ descriptionError }}</div>
    

</div>

        <datepicker  v-model="selectedDate" :format="format" :language="'en'" alt="delete icon" style="
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;height: 2.5rem;border-color:rgb(1, 1, 8);
    border-radius: .25rem ;">
      </datepicker>
      
      <div v-if="selectedDateError" class="error">{{ selectedDateError }}</div>
        <div>
          <label>
            <input type="radio" v-model="selectedRadio" value="Low">
            Low
          </label>
          <label>
            <input type="radio" v-model="selectedRadio" value="Mid">
            Mid
          </label>
          <label>
            <input type="radio" v-model="selectedRadio" value="High">
            High
          </label>
        </div>
        <button class="butn" @click="submit">
        <i
                        aria-hidden="true"
                        class="material-icons"
                      >{{ dialogTitle == 'Edit Task' ? 'edit' : 'add' }}</i>
        {{ submitButtonText }}</button>
        <button class="butn1" @click="$emit('close')"><i
                        aria-hidden="true"
                        class="material-icons"
                      >dangerous</i>Cancel</button>
      </div>
    </div>
  </div>
</template>


<script>
import datepicker from 'vue3-datepicker';
import { useToast } from "vue-toastification";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


export default {
  name: 'ItemDialog',



setup() {
      // Get toast interface here we define it
      const toast = useToast();
      return { toast }
    },





  components: {
    datepicker,useToast,VueDatePicker 
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: this.isEditing ?  this.item.title :'',
      titleError: '',
      description: this.isEditing ?  this.item.description :'',
      descriptionError: '',
      selectedDateError:'',
      selectedDate: this.isEditing ?  new Date(this.item.date) :'',
      selectedRadio: this.isEditing ?  this.item.radio :'Low',
    };
  },
  computed: {
    dialogTitle() {
      return this.isEditing ? 'Edit Task' : 'Add Task';
    },
    submitButtonText() {
      return this.isEditing ? 'Edit' : 'Add';
    }
  },
  watch: {
    item(newValue) {
      if (newValue) {
        this.title = item(newValue).title;
        this.description = newValue.description;
        this.selectedDate = new Date(newValue.date);
        this.selectedRadio = newValue.radio;
      }
    },
    show(value) {
      if (value) {
        this.title = '';
        this.titleError = '';
        this.description = '';
        this.descriptionError = '';
        this.selectedDate = null;
        this.selectedDateError = null;
        this.selectedRadio = 'Low';
      }
    }
  },
  methods: {
    submit() {
      if (!this.title) {
        this.titleError = 'Title is Required!';
      }
      if (!this.selectedDate) {
        this.selectedDateError = 'Deadline not selected';
      }
      if (!this.description) {
        this.descriptionError = 'Description is Required!';
      } else {
        let action = this.isEditing ? 'update' : 'add';
        console.log("action "+action)

        this.titleError = '';
        let exists = false
        console.log(this.item)
        //for (const item of this.item) {
            //if (item?.food?.id === id) {
             //   exists = true
              //  break
           // }
        //}
        this.$emit(action, {
          id: this.isEditing ? this.item.id : null,
          title: this.title,
          description: this.description,
          date: this.selectedDate.toLocaleDateString('en-GB'),
          radio: this.selectedRadio,
          
        });
       if(action=='update'){
          this.toast.success("The task was updated successfully");
          console.log("hello1");
       }else{
        this.toast.success("The task was added successfully");
        console.log("hello2");
       }
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$emit('close');
    }
  }
};
</script>

<style>

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }
      
      .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    
    .content {
      
      padding: 1rem;
    }
    
      .error {
        color: red;
      }
      
      .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem; /* add some space*/
      }
    
      
    .butn {
      
      appearance: button;
      backface-visibility: hidden;
      background-color: #405cf5;
      border-radius: 6px;
      border-width: 0;
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
      font-size: 100%;
      height: 33px;
      outline: none;
      overflow: hidden;
      padding: 0 25px;
      position: relative;
      text-align: center;
      text-transform: none;
      transform: translateZ(0);
      transition: all .2s,box-shadow .08s ease-in;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
  
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .butn1 {
     
      appearance: button;
      backface-visibility: hidden;
      background-color: #ee0f0f;
      border-radius: 6px;
      border-width: 0;
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
      font-size: 100%;
      height: 33px;
      outline: none;
      overflow: hidden;
      padding: 0 25px;
      position: relative;
      text-align: center;
      text-transform: none;
      transform: translateZ(0);
      transition: all .2s,box-shadow .08s ease-in;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
  
      margin-top: 15px;
      margin-bottom: 15px;
    }
    
    .butn:disabled {
      cursor: default;
    }
    
    .butn:focus {
      box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
    }
    .dialog-header {
      background-color: #405cf5; /* Add a background color */
      color: white; /* Set the text color */
      font-weight: bold; /* Make the text bold */
      padding: 1rem; /* Add some padding */
      border-top-left-radius: 4px; /* Add some border radius */
      border-top-right-radius: 4px;
    }

    
      </style>  

      <style lang="scss">
    .input {
  position: relative;
  
  &__label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * .5);
    margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * .5);
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    background: var(--color-background);
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
    color: rgb(1, 1, 8);
  }
  
  &__field {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 1px solid currentColor;
    padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
    color: rgb(1, 1, 8);
    background: transparent;
    border-radius: var(--size-radius);
    height: 2.5rem;
    border-color:rgb(1, 1, 8);
    border-radius: .25rem;
    
    &:focus,
    &:not(:placeholder-shown) {
      border-color: rgb(1, 1, 8);
    
      
      & + .input__label {
        border-color:rgb(1, 1, 8);
        transform: translate(.25rem, -65%) scale(.8);
        color: rgb(1, 1, 8);
     
      }
    }
  }
}


    </style>