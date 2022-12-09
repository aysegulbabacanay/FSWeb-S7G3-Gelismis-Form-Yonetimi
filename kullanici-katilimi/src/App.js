import React, { useState, useEffect } from "react";
import './App.css';
import * as yup from "yup";
import axios from "axios";

// form yapacağız; label + input
// state ile form değerlerini tutacağız
// onChange fonksiyonuna state değiştirme fonksiyonunu bağlayacağız
// handleChange fonksiyonu yazacağız
// yup'ı import edeceğiz
// yup şeması oluşturacağız, fieldlara istediğimiz kriterleri vereceğiz

const schema = yup.object().shape({
  Adınız: yup
    .string()
    .required("User is required")
    .min(6, "User needs to be 6 chars min"),
    Soyadınız: yup
    .string()
    .required("User is required"),
  Cinsiyet: yup.mixed().oneOf(["Kadın", "Erkek"], "You must select a cinsiyet"),
  Seçiniz: yup
    .mixed()
    .oneOf(["1", "2"], "You must choose a konum"),
  Doğrula: yup.mixed().oneOf([true], "You must give away your all data"),
});

function App() {

  const[formData,setFormdata]= useState({
    Adınız: "",
    Soyadınız: "",
    Cinsiyet:"",
    Seçiniz:"",
    Doğrula:false
 })
 const [errors, setErrors] = useState({
  Adınız: "",
  Soyadınız: "",
  Cinsiyet:"",
  Seçiniz:"",
  Doğrula:""
});

const [userId, setUserId] = useState("");

 useEffect(() => {
  schema.isValid(formData).then((valid) => setDisable(!valid));
}, [formData]);
// save butonu bundan sonra tüm değerleri girince aktifleşti. (save(submit) kısmını önce disable ettiğimiz için aktif değildi.)

const checkFormErrors = (name, value) => {
  yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      // Hata yoksa buraya geliyordu
      setErrors({
        ...errors,
        [name]: ""
      });
    })
    .catch((err) => {
      setErrors({
        ...errors,
        [name]: err.errors[0]
      });
    });
};

 const handleChange = (e)=>{
  const { checked, name, value, type } = e.target;
  const valueToUse = type === "checkbox" ? checked : value;

  checkFormErrors(name, valueToUse);
  
  setFormdata({
    ...formData,
    [name]: valueToUse
 })}
 // Formun gonderilmesini engelliyoruz.
 const handleSubmit = (event) => {
  // Formun gonderilmesini engelliyorum
  event.preventDefault();

  // Yeni bir kullanici objesi olusturacagim
  const newUser = {
    Adınız: formData.Adınız.trim(),
    Soyadınız: formData.Soyadınız,
    Cinsiyet: formData.Cinsiyet, 
    Seçiniz: formData.Seçiniz,
    Doğrula:formData.Doğrula
  };

  // Axios ile simdi gonderecegiz
  axios
    .post("https://reqres.in/api/user", newUser)
    .then((res) => {
      setUserId(res.data.id);
//başarılı olduğunda formu sıfırlasın.
      setFormdata({
        Adınız: "",
        Soyadınız: "",
        Cinsiyet:"",
        Seçiniz:"",
        Doğrula:false
      });
    })
    .catch((err) => {
      debugger;
    });
};









// submitin çalışmasını engelle

const[disable,setDisable]= useState(true)


  return (
    <div className="App">
        <div style={{ color: "red" }}>
        <div>{errors.Adınız}</div>
        <div>{errors.Soyadınız}</div>
        <div>{errors.Cinsiyet}</div>
        <div>{errors.Seçiniz}</div>
        <div>{errors.Doğrula}</div>

      </div>
      <form onSubmit= {handleSubmit}>
        <p>
          <label>Adınız : </label>
          <input
            type="text"
            name="Adınız"
            placeholder="Adınız"
            value={formData.Adınız}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Soyadınız : </label>
          <input
            type="text"
            name="Soyadınız"
            placeholder="Soyadınız"
            value={formData.Soyadınız}
            onChange={handleChange}
          />
        </p>
        <span>Cinsiyet :  </span>
        <span>
          <label>Kadın</label>
          <input
            type="radio"
            name="Cinsiyet"
            value="Kadın"
         checked= {formData.Cinsiyet === "Kadın" }
         onChange={handleChange}
          />
          
        </span>
        <span>

          <label>Erkek</label>
          <input
            type="radio"
            name="Cinsiyet"
            value="Erkek"
            checked= {formData.Cinsiyet === "Erkek" }
            onChange={handleChange}
            
          />
          

        </span>
        <p>
          <label>Seçiniz </label>
          <select
            type="text"
            name="Seçiniz"
            value={formData.Seçiniz}
            onChange={handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="1">Öğrenci</option>
            <option value="2">Öğretmen</option>

          </select>
        </p>
        <p>
          <label>Doğrula </label>
          <input
            type="checkbox"
            name="Doğrula"
            checked= {formData.Doğrula}
            onChange={handleChange}
          />

        </p>
        <p>
          <input type="submit" value = "Save" disabled={disable}/>
        </p>
        <p>{userId !== "" ? <h3>Created user with ID: {userId}</h3> : null}</p>

      </form>
    </div>
  );
}

export default App;
