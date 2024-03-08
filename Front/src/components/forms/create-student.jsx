import { useEffect } from "react";
import Offcanvas from "../ui/offcanvas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectWithFilter from "../../components/SelectWithFilters";
import { useDispatch, useSelector } from "react-redux";
import { getTutorsOptions, setSelectedTutorsOptions } from "../../actions/actions";

const CreateStudent = ({ onClose, onSubmit }) => {

  const { formState: { errors }, register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const tutorsOptions = useSelector((state) => state.tutorsOptions.tutorsOptions);
  const selectedTutorsOptions = useSelector((state) => state.tutorsOptions.selectedTutorsOptions);

  const handleSelectChange = (selectedTutorsOptions) => {
    dispatch(setSelectedTutorsOptions(selectedTutorsOptions));
  };

  useEffect(() => {
    dispatch(getTutorsOptions())
  }, [dispatch])

  useEffect(() => {
    setValue("tutors", selectedTutorsOptions)
  }, [selectedTutorsOptions])

  return (
    <>
      <Offcanvas.Body>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-base font-medium">
              Nombre
            </label>
            <input
              {...register("firstName")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.firstName ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.firstName && <p className="text-red-500 text-xs">{errors?.firstName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-base font-medium">
              Apellido
            </label>
            <input
              {...register("lastName")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.lastName ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.lastName && <p className="text-red-500 text-xs">{errors?.lastName.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-base font-medium">
              Usuario
            </label>
            <input
              {...register("username")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.username ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.username && <p className="text-red-500 text-xs">{errors?.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-base font-medium">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.password ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.password && <p className="text-red-500 text-xs">{errors?.password.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              {...register("email")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.email ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.email && <p className="text-red-500 text-xs">{errors?.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phonenumber" className="text-base font-medium">
              Celular
            </label>
            <input
              {...register("phone")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.phone ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.phone && <p className="text-red-500 text-xs">{errors?.phone.message}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="grade" className="text-base font-medium">
              Grado
            </label>
            <input
              {...register("grade")}
              className={`bg-cyan-50 border rounded py-1.5 px-3 border-gray-400 ${errors?.grade ? 'border-red-500' : 'rounded'}`}
            />
            {errors?.grade && <p className="text-red-500 text-xs">{errors?.grade.message}</p>}
          </div>
          <div>
            <label htmlFor="tutors" className="text-base font-medium">
              Tutores Asociados
            </label>
            <SelectWithFilter
              data={tutorsOptions}
              selectedOptions={selectedTutorsOptions}
              setSelectedOptions={handleSelectChange}
            />
            {errors?.tutors && <p className="text-red-500 text-xs">{errors?.tutors.message}</p>}
          </div>
        </div>
      </Offcanvas.Body>
      <Offcanvas.Footer
        text={"Crear"}
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
      />
    </>
  )
}

export default CreateStudent;

const schema = z.object({
  firstName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  lastName: z.string().regex(/^[a-zA-Z\s]+$/, "Debe ser alfabetico"),
  username: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  password: z.string().regex(/^[\w\d\s]+$/, "Debe ser alfanumérico"),
  email: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Dirección de correo electrónico inválida"))),
  phone: z.preprocess((value) => value === "" ? undefined : value, z.optional(z.string().regex(/^\d{10}$/, "Número de teléfono inválido, debe tener 10 dígitos"))),
  grade: z.string().regex(/^\d{1}$/, "Grado inválido debe tener 1 dígito"),
  tutors: z.array(
    z.object({
      value: z.number(),
    })
  )
})