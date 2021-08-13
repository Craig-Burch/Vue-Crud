<template>
  <div>
   <section class="tertiary-bg-pk mt-5">
   <v-container>
    <v-row >
     <v-col  class="text-left" >
        <h2 style="border-radius: 10px; padding:10px; background-color:white;">Add New Blog </h2>
    </v-col>
   </v-row>
      <div class="blogWrapper">
      <v-form ref="data" @submit.prevent="submitBlog" enctype="multipart/form-data">
       <v-row>
        <v-col cols="6" md="6">
          <v-text-field
            name="title"
            v-model="data.title"
            :rules="nameRules"
            :counter="50"
            label="Blog Post Title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field
            name="subject"
            v-model="data.subject"
            :rules="nameRules"
            :counter="50"
            label="Subject"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            name="author"
            v-model="data.author"
            :rules="nameRules"
            label="Author"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12"md="6">
         <v-select
           name="category"
           v-model="data.category"
           :items="blogCats"
           label="Category"
           required
         ></v-select>
       </v-col>
       <v-col cols="12" md="12" class="text-left">
        <p class="black-text-color">Upload Image For Blog</p>

          <input 
          name="blogPic"
          id="blogPicture"
          type="file" 
          @change="onFileChangedBlog"
          >

       </v-col>
       <v-col
        cols="12"
        md="12"
       >
        <!-- <v-textarea
          outlined
          name="blogBody"
          v-model="data.blogBody"
          label="Blog Body"
        ></v-textarea>
 -->     
 <!-- :options="editorOption" -->

      </v-col>

     </v-row>
     <v-row>
      <v-col class="text-left">
        <v-btn class="primary-bg-pk white--text" @click="onUploadBlog" type="submit">
           <h3>Submit</h3>
        </v-btn>
       </v-col>
     </v-row>
    </v-form>
   </div>
  </v-container> 
</section>


 <section style="background-color: white;" class="tertiary-bg-pk mt-5">
   <v-container>
    <v-row >
     <v-col cols="12" md="5">
         <v-select
           name="account"
           v-model="data.account"
           :items="accounts"
           label="Category"
           required
         ></v-select>
       </v-col>
       <v-col cols="12" md="2" class="text-left">
        <v-btn class="primary-bg-pk white--text" @click="onUploadBlog" type="submit">
           <p>New</p>
        </v-btn>
       </v-col>
       <v-col cols="12" md="2" class="text-left">
        <v-btn class="primary-bg-pk white--text" @click="onUploadBlog" type="submit">
           <p>Save </p>
        </v-btn>
       </v-col>
       <v-col cols="12" md="2" class="text-left">
        <v-btn class="primary-bg-pk white--text" @click="onUploadBlog" type="submit">
           <p>Delete</p>
        </v-btn>
       </v-col>

    </v-row>
  </v-container>
</section>


<!-- list -->
<section class="tertiary-bg-pk">
  <v-container>
     <h2 class="text-left" style="border-radius: 10px; padding:10px; background-color:white;">Current Blogs </h2>
     <br>
    <v-data-table
    :headers="listHeaders"
    :items="usableObject"
    :items-per-page="5"
    class="elevation-5"
    >
    <template v-slot:item.actions="{ item }">
      <v-btn class="white--text" style="margin:5px;" color="blue" @click="editItem(item)">
        Edit
      </v-btn>
      <v-btn class="white--text" style="margin:5px;" color="red" @click="(r) => deleteItem(item, r)"> 
        Delete
      </v-btn>
    </template>
    </v-data-table>
  </v-container>
</section>


  <!-- edit -->
   <v-dialog v-model="dialog">
          <v-card>
           <v-card-title>
             <span class="headline">Edit Blog</span>
           </v-card-title>
           <hr>
           <!-- <img class="selectedBlogImages" :src="selectedBlogPic">  -->
           <v-card-text>
             <!-- <p class="black-text-color" v-html="selectedBlogBody">
             </p> -->
           </v-card-text>
           <div class="blogEditWrapper" style="padding: 20px;">
             <v-form ref="editData" @submit.prevent="editBlog" enctype="multipart/form-data">
              <v-row>
               <v-col cols="6"md="6">
                 <v-text-field
                   name="title"
                   v-model="editData.title"
                   :rules="nameRules"
                   :counter="50"
                   label="Blog Post Title"
                   required
                 ></v-text-field>
               </v-col>
               <v-col cols="6" md="6" >
                 <v-text-field
                   name="subject"
                   v-model="editData.subject"
                   :rules="nameRules"
                   :counter="50"
                   label="Subject"
                   required
                 ></v-text-field>
               </v-col>
               <v-col cols="12" md="6">
                <v-text-field
                   name="author"
                   v-model="editData.author"
                   :rules="nameRules"
                   label="Author"
                   required
                 ></v-text-field>
               </v-col>
               <v-col cols="12"md="6">
                <v-select
                  name="category"
                  v-model="editData.category"
                  :items="blogCats"
                  label="Category"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="12" class="text-left">
               <p class="black-text-color">Upload Image For Blog</p>
                 <input 
                 name="blogPic"
                 id="blogPicture"
                 type="file" 
                 @change="onFileChangedBlog"
                 >
              </v-col>
              <v-col cols="12"md="12" >
                  <!-- :options="editorOption" -->
                 <quill-editor 
                        name="blogBody"
                       v-model="editData.blogBody"
                       ref="myQuillEditor"
                
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                 </quill-editor>
             </v-col>
        </v-row>
         <v-row>
          <v-col class="text-left">
            <v-btn class="primary-bg-pk white--text" @click="" type="submit">
               Submit
              </v-btn>
             </v-col>
            </v-row>
         </v-form>
         </div>
           <hr>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn
               color="green darken-1"
               text
               @click="dialog = false"
             >
               Close
             </v-btn>
           </v-card-actions>
         </v-card>
        </v-dialog>

  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from "axios";


let onUploadBlog = (blogPic) => {
      const formData = new FormData()
      if (blogPic == undefined) {
         alert('Checking for New Image Upload... If blog does not save please add a new image.');
      }
      //http://purekismetblog-env.eba-pqrjzbix.us-east-1.elasticbeanstalk.com/s3-upload
      //http://localhost:8081/s3-upload
      else {
        formData.append('blogPic', blogPic, blogPic.name);
        return axios
          .post('https://6r71owgai6.execute-api.us-east-1.amazonaws.com/admin/s3-upload', formData)
          .then(response => {
            console.log(response);
            return Promise.resolve(response)
          })
         .catch(error => {
           console.log(error);
           return Promise.reject(error)
         });
      }
}


export default {
  components: {
    Loading
  },
  name: 'Admin',
  data () {
    return {
      data: [],
      editData:[],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 50 || 'Name must be less than 50 characters',
      ],
      //email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      states: [
        'NC',
        'VA',
        'WA'
      ],
      //table and crud storage
        listHeaders: [
          { text: 'Platform Name', align: 'start', sortable: false, value: 'platformName'},
          { text: 'Option Name', value: 'optionName' },
          { text: 'Option Value', value: 'optionValue' },
          { text: 'DOT Digital ID', value: 'dotDigitalId' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        //arrays for accounts 
        accounts: '',
        //arrays for list
        init: [],
        objs: [],
        usableObject: [],
        arr: [],
        usableArray: [],
        finalArray: '',


        editedItem: [],
        itemToEdit: [],
        itemToSave: [],
        itemToDelete: [],
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
    }
  },
  methods: {
    async getAccounts() {
      try { 
       const accounts = await axios.get(`https://services.metricsamsi.com/v1.0/dealers/Accounts/Google?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f`);
       this.accounts = accounts.data.data;
       console.log(this.accounts);
      } catch (e) {
        console.log(`getAccounts accounts`, e);
        if (e.response.status === 400) {
          this.error = e.response.data.message;
        }
      }

    },
     async getList() {
       try { 
        //https://services.metricsamsi.com/v1.0/dealers/Options/1?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f
        const list = await axios.get(`https://services.metricsamsi.com/v1.0/dealers/Options/1?apiKey=81c14de2-6891-461b-9ea6-3ed218675b8f`);

        this.init = list.data;
        this.objs = this.init.data[0]

        console.log('this.init');
        console.log(this.init);

        console.log('this.objs');
        console.log(this.objs);
         console.log(typeof this.objs);

        this.usableObject = [{...this.objs}];
        console.log('this.usableObject');
        console.log(this.usableObject);
       
        
        console.log('this.arr');
        this.arr = Object.entries(this.objs);
        console.log(this.arr);
        console.log([...this.arr]);
        //this.usableArray = Object.assign({}, ...this.arr)
        console.log('this.usableArray');
        this.usableArray = [{...this.arr}];
        console.log(this.usableArray[0]);

         let keys = Object.keys(this.usableArray[0]);

          keys.forEach(key => {
             this.finalArray = this.usableArray[0][key];
             console.log('this.finalArray');
             console.log(this.finalArray);
          })


  

        //console.log(typeof this.arr);
        //console.log(typeof this.arr[2][1]);

        //this.arr[2][1] = Object.assign({}, item)

        // this.renderingObj = Object.fromEntries(this.arr);
        // console.log(this.renderingObj[2][1]);
        // console.log(this.renderingObj[2][1]);
        //console.log(this.blogs[0].title);
        // this.info.sort(function(a, b) {
        //     var nameA = a.companyName.toUpperCase(); 
        //     var nameB = b.companyName.toUpperCase(); 
        //     if (nameA < nameB) {
        //       return -1;
        //     }
        //     if (nameA > nameB) {
        //       return 1;
        //     }
        //     // names must be equal
        //     return 0;
        //   });
      } catch (e) {
        console.log(`getList cars`, e);
        if (e.response.status === 400) {
          this.error = e.response.data.message;
        }
      }
      
    },
    editItem(item) {
        this.editedIndex = this.blogs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log('edit blog----------1');
        console.log(this.editedIndex);
        console.log(this.editedItem);

        this.itemToEdit = this.blogs[this.editedIndex];
        this.editData = this.blogs[this.editedIndex];

         //  axios
         // .put(`https://dad59dxvm7.execute-api.us-east-1.amazonaws.com/admin/consultants/${this.data.consultant_id}`, formValues)
    },
    async deleteItem (item, r) {
        console.log('----------------3');
        this.editedIndex = this.blogs.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
        console.log(this.editedIndex);
        console.log(this.editedItem);

        this.itemToDelete = this.blogs[this.editedIndex];
        //http://purekismetblog-env.eba-pqrjzbix.us-east-1.elasticbeanstalk.com/blogs/${this.itemToDelete.blog_id}
        //http://localhost:8081/blogs/${this.itemToDelete.blog_id}
        try {
          if (confirm('Do you want to delete this BLOG? This Cannot Be Undone...')) {
            let rowhtml = r.target.parentNode.parentNode.parentNode;
            rowhtml.parentNode.removeChild(rowhtml);
            const myRowDelete = await axios.delete(`https://6r71owgai6.execute-api.us-east-1.amazonaws.com/admin/blogs/${this.itemToDelete.blog_id}`)
          }
        } catch (e) {
           console.log(`Remove Row Error =`, e);
           if (e.response.status === 400) {
             this.error = e.response.data.message;
           }
        }
      },
    onUploadBlog() {
      const formData = new FormData()
      formData.append('blogPic', this.blogPic, this.blogPic.name);
      //http://purekismetblog-env.eba-pqrjzbix.us-east-1.elasticbeanstalk.com/s3-upload
      //http://localhost:8081/s3-upload
      return axios
        .post('https://6r71owgai6.execute-api.us-east-1.amazonaws.com/admin/s3-upload', formData)
        .then(response => {
          console.log(response);
          return Promise.resolve(response)
        })
        .catch(error => {
          console.log(error);
          return Promise.reject(error)
        });
    },
    
    onFileChangedBlog (event) {
      this.blogPic = event.target.files[0];
        if (this.blogPic !== null && 
          this.blogPic.size <= 500000) {
          console.log(this.blogPic.size)
          //iconChangeEMP.classList.remove("icon-cloud-upload-94");
          //iconChangeEMP.classList.add("icon-check-2");
          alert('File Uploaded..');
        } else {
          console.log(this.blogPic.size)
          alert('WARNING.. File is too large! Limit is 500 KB.. Please Try Again.');
        }
    },
    async submitBlog() {
      let formValues = [];
      const inputs = document.querySelectorAll(".blogWrapper input, select, .ql-editor");
      for (let input of inputs) {
         let name = input.name;
         let value = input.value;
         formValues.push({ [name]: value });
      }
      formValues = Object.assign({}, ...formValues);
      console.log("------------data",this.data)
      //grab html tags from blog body
      formValues.blogBody = document.querySelector(".ql-editor").innerHTML;
      console.log(formValues.blogBody);
      
      this.data = formValues;
      
      //picture
      let urls = await onUploadBlog(this.blogPic);

      formValues.blogPic = urls.data.imageUrl1;
      console.log("------------formValues.blogPic")
      console.log(formValues.blogPic)
      console.log("------------formValues")
      console.log(formValues);

      //time
       var today = new Date();
       var dd = String(today.getDate()).padStart(2, '0');
       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
       var yyyy = today.getFullYear();

       today = mm + '/' + dd + '/' + yyyy;
       formValues.date = today;


      //error handling
      if (formValues.title == "") {
        alert('TITLE is REQUIRED. Please fix in Edit Mode.');
      } if (formValues.subject == "") {
        alert('Subject is REQUIRED. Please fix in Edit Mode.');
      } if (formValues.author == "") {
        alert('Author is REQUIRED. Please fix in Edit Mode.');
      } if (formValues.category == "") {
        alert('Category is REQUIRED. Please fix in Edit Mode.');
      } 
      else {
        //http://localhost:8081/blogs
        //http://purekismetblog-env.eba-pqrjzbix.us-east-1.elasticbeanstalk.com/blogs
      axios
        .post("https://6r71owgai6.execute-api.us-east-1.amazonaws.com/admin/blogs", formValues)
        .then(response => {
          console.log(response);
          alert("Thank you, Blog has been added.");
          this.$router.push('/Blog')
          //this.$router.go()
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    async editBlog() {
      console.log('edit blog -------7');
      let formValues = [];
      const inputs = document.querySelectorAll(".blogEditWrapper input, select, .ql-editor");
      for (let input of inputs) {
         let name = input.name;
         let value = input.value;
         formValues.push({ [name]: value });
      }
      formValues = Object.assign({}, ...formValues);
      console.log("------------data",this.editData);
      this.editData = formValues;
      this.itemToSave = this.itemToEdit;
      console.log('saaaave');
      console.log(this.itemToSave);

      //picture
      let urls = await onUploadBlog(this.blogPic);

      if (this.blogPic == undefined) { 
         this.itemToSave.blogPic = this.itemToSave.blogPic;
      } else {
        let urls = await onUploadBlog(this.blogPic);
        this.itemToSave.blogPic = urls.data.imageUrl1;
      }

      console.log("------------formValues.blogPic");
      console.log(this.itemToSave.blogPic);
      console.log("------------formValues");
      console.log(this.itemToSave);

      //http://purekismetblog-env.eba-pqrjzbix.us-east-1.elasticbeanstalk.com/blogs/${this.itemToSave.blog_id}`, this.itemToSave
      //http://localhost:8081/blogs/${this.itemToSave.blog_id}`, this.itemToSave
      axios
        .put(`https://6r71owgai6.execute-api.us-east-1.amazonaws.com/admin/blogs/${this.itemToSave.blog_id}`, this.itemToSave)
        .then(response => {
          console.log(response);
          alert("Blog has been updated.");
          this.dialog = false;
          this.refreshOnExit += 1;
          //this.$router.push('/')
        })
        .catch(error => {
          console.log(error);
        });
    
    },

   },
   computed: {
    },
   created() {
    this.getAccounts();
    this.getList();
   },
}
</script>

<style scoped>
</style>







<!-- orginal if confirm else in remove row function -->
<!--   if (confirm('Do you want to delete this Blog?')) {
        let rowId = r.target.parentNode.parentNode.parentNode.parentNode;
            rowId.parentNode.removeChild(rowId);
            console.log('rowId');
            console.log(rowId);
            //https://7olb5ali48.execute-api.us-east-1.amazonaws.com/admin/consultants
            //const myRowPost = await axios.post("http://localhost:8081/consultants/remove", this.itemToDelete)
            console.log('this.itemToDelete.consultant_id');
            console.log(this.itemToDelete.consultant_id);
            //const myRowDelete = await axios.delete(
            //`https://dad59dxvm7.execute-api.us-east-1.amazonaws.com/admin/consultants/${this.itemToDelete.consultant_id}`)
            //'http://localhost:8081/consultants/:id', this.infoModal)
         } else {
            return 0; 
            } -->