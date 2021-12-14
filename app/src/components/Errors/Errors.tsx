const Errors = (errors: any) => {
  const errorList: any[] = []

  console.log(errors)
  // eslint-disable-next-line react/destructuring-assignment
  Object.keys(errors).forEach((key: any) => errorList.push(errors[key]))

  return (
    <div className='mt-3'>
      {errorList.map((error) => (
        <p className='alert alert-danger'>{error}</p>
      ))}
    </div>
  )
}

export default Errors
