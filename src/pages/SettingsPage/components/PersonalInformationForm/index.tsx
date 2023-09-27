import { FormikErrors, FormikValues } from 'formik'
import { ChangeEvent, FC, useState } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { BaseInput } from '../../../../components/BaseInput'
import { BaseSelect } from '../../../../components/BaseSelect'
import GoogleAutocomplete from '../../../../components/GoogleAutocomplete'
import { BUCKET_AVATAR_USER } from '../../../../constants/buketsImage'
import { ROLES } from '../../../../constants/community'
import { User } from '../../constants'

interface Props {
  user: User
  errors: FormikErrors<User>
  values: FormikValues
  setFieldValue: (field: string, value: string | number | File | null) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PersonalInformationForm: FC<Props> = ({
  user,
  errors,
  values,
  handleChange,
  setFieldValue,
}) => {
  const [previewURL, setPreviewURL] = useState('')

  const handleChangeLocation = (result: {
    results: {
      formatted_address: string
      address_components: {
        long_name: string
        short_name: string
        types: string[]
      }[]
    }[]
    latLng: {
      lat: number
      lng: number
    }
  }) => {
    setFieldValue(
      'location.address',
      result?.results[0]?.formatted_address || '',
    )
    setFieldValue(
      'location.country',
      result?.results[0]?.address_components[3].long_name || '',
    )
    setFieldValue(
      'location.city',
      result?.results[0]?.address_components[1].long_name || '',
    )
    setFieldValue('location.lng', result?.latLng?.lat)
    setFieldValue('location.lat', result?.latLng?.lng)
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null
    setFieldValue('image', selectedFile)

    if (selectedFile) {
      setPreviewURL(URL.createObjectURL(selectedFile))
    }
  }

  const options = [
    { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
    { value: ROLES.SHELTER, label: ROLES.SHELTER },
    { value: ROLES.VET, label: ROLES.VET },
    { value: ROLES.VOLUNTEER, label: ROLES.VOLUNTEER },
  ]

  return (
    <div className="divide-y mt-20 divide-white/5">
      <div className="flex pr-5 md:pr-12 gap-10">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="col-span-full flex items-center gap-x-8">
              <img
                alt="user image"
                src={
                  previewURL
                    ? previewURL
                    : `${BUCKET_AVATAR_USER}${user?.image}`
                }
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="file"
                    className="sm:w-auto w-full rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
                  >
                    Select a file
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    id="file"
                    name="images"
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1.5MB max.
                </p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="firstName"
                label="First name"
                placeholder="First name"
                error={errors?.firstName}
                handleChange={handleChange}
                value={values?.firstName || user?.firstName}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="lastName"
                label="Last name"
                placeholder="Last name"
                error={errors?.lastName}
                handleChange={handleChange}
                value={values?.lastName || user?.lastName}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseInput
                name="username"
                label="Username"
                placeholder="janesmith"
                error={errors?.username}
                handleChange={handleChange}
                value={values?.username || user?.username}
              />
            </div>
            <div className="sm:col-span-3">
              <BaseSelect
                name="role"
                label="Role"
                options={options}
                error={errors?.role}
                setFieldValue={setFieldValue}
                value={values?.role || user?.role}
              />
            </div>
            <div className="col-span-full">
              <BaseInput
                isdisabled
                value={user.email}
                label="Email address"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className="mt-8 flex">
            <BaseButton type="submit" text="Save" />
          </div>
        </div>
      </div>
      <div className="flex pr-5 md:pr-12 gap-10 mt-14">
        <div className="w-[50%]">
          <h2 className="text-base font-semibold leading-7 text-primary-950">
            Location
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            If you are a shelter, please add your location. it is important to
            be able to locate you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
          {user?.location?.address && (
            <div className="col-span-full text-sm text-primary-700">
              {` Selected address: ${
                user?.location?.address
                  ? user.location.address
                  : 'No address selected'
              }
                `}
            </div>
          )}
          <div className="col-span-full">
            <GoogleAutocomplete
              label="Location"
              setLocation={handleChangeLocation}
              placeholder={user?.location?.address || 'Search by location'}
            />
          </div>
          <div className="mt-8 flex">
            <BaseButton type="submit" text="Save" />
          </div>
        </div>
      </div>
    </div>
  )
}