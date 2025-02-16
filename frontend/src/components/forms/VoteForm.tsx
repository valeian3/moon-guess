import { useFormik } from 'formik'
import * as Yup from 'yup'

import { votes } from 'services/api'

import { useAuth } from 'hooks/hooks'

import { showToast } from 'utils/utils'

function VoteForm() {
  const { user } = useAuth()

  const formik = useFormik({
    initialValues: {
      price: '',
    },
    validationSchema: Yup.object({
      price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be positive')
        .required('Price is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const formattedPrice = parseInt(values.price.replace(/\s+/g, ''), 10)
      if (isNaN(formattedPrice)) {
        showToast('error', 'Invalid price entered')
        return
      }
      votes
        .postVote({ userId: user?.id, price: Number(formattedPrice) })
        .then(() => {
          showToast('success', 'Vote submitted successfully')
        })
        .catch((err) => {
          showToast(
            'error',
            err.response?.data?.message || 'Something went wrong'
          )
        })
        .finally(() => resetForm())
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mb-4 flex w-full flex-col gap-2"
    >
      <label
        htmlFor="price"
        className="text-sm font-medium text-gray-900 dark:text-white"
      >
        Vote
      </label>

      <input
        type="text"
        id="price"
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`block w-full rounded-lg border p-2.5 text-sm transition-all ${
          formik.touched.price && formik.errors.price
            ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
        } `}
        placeholder="Enter price"
      />

      {formik.touched.price && formik.errors.price && (
        <p className="text-sm text-red-500">{formik.errors.price}</p>
      )}

      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="rounded-lg bg-indigo-700 px-4 py-2 text-white transition-all duration-200 hover:bg-indigo-600 dark:hover:bg-indigo-800"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Vote Now
        </button>
      </div>
    </form>
  )
}

export default VoteForm
