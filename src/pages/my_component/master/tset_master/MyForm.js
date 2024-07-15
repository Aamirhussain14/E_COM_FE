import { useForm, useFieldArray } from 'react-hook-form';

const MyForm = () => {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nestedFields',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            name={`nestedFields[${index}].nestedFieldName`}
            defaultValue={field.nestedFieldName}
            ref={control.register()}
          />

          {/* Sub-nested Fields */}
          {field.subNestedFields.map((subField, subIndex) => (
            <div key={subField.id}>
              <input
                name={`nestedFields[${index}].subNestedFields[${subIndex}].subNestedFieldName`}
                defaultValue={subField.subNestedFieldName}
                ref={control.register()}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ nestedFieldName: '', subNestedFields: [] })}
          >
            Add Sub Field
          </button>

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ nestedFieldName: '', subNestedFields: [] })}>
        Add Field
      </button>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MyForm;
