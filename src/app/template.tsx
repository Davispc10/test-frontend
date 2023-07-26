'use client'

import React from "react"
import { useFormik } from 'formik'

export default function Template({ children }: { children: React.ReactNode }) {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: values => {
      console.log('onSubmit', values)
    }
  })

  return (
    <>
      <header className="header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            <input
              className="search"
              type="text"
              id="search"
              name="search"
              placeholder="Enter name your character"
              onChange={handleChange}
              required
              value={values.search}
            />
          </label>
        </form>
      </header>

      {children}
    </>
  )
}
