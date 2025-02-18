import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { votes } from 'services/api'

import { useAuth } from 'hooks/hooks'

import { showToast } from 'utils/utils'

function VoteForm() {
  const { user } = useAuth()
  const navigate = useNavigate()

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
          navigate('/')
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
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-4">
      <legend className="fieldset-legend">Submit your vote</legend>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <label className="label">Vote</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`input md:input-md lg:input-lg w-full transition-all duration-200 ${
            formik.touched.price && formik.errors.price
              ? 'input-error'
              : 'input-neutral'
          } `}
          placeholder="E.g. 15000"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="fieldset-label text-error">{formik.errors.price}</p>
        )}

        <button
          className="btn btn-soft btn-block btn-primary md:btn-md lg:btn-lg"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Vote Now
        </button>
      </form>
    </fieldset>
  )
}

export default VoteForm
