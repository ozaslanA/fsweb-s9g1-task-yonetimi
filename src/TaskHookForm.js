import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // task ekleme
  function myCustomhandleSubmit(data) {
    console.log(data);
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();

    /* submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    setFormData({
      title: "",
      description: "",
      people: [],
    });*/
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(myCustomhandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task Baslığı yaz",
            minLength: {
              value: 3,
              message: "Task Başlığı En az 3 Karakterli olmalı",
            },
          })}
          type="text"
        />
        {errors.title && <p className="input-error">{errors.title?.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Açıklama Giriniz",
            maxLength: {
              value: 10,
              message: "Task Başlığı En fazla 10 Karakter Olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (peoList) =>
                    peoList.length <= 2 || "En fazla 2 kişi seçebilirsiniz",
                })}
                value={p}
              />
              {p}
            </label>
          ))}
          {errors.people && (
            <p className="input-error">{errors.people?.message}</p>
          )}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
