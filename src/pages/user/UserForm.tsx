import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import Dialog from "../../component/dialog";
import Input from "../../component/form/input";
import HDatePicker from "../../component/form/HDatePicker";
import HSelect from "../../component/form/HSelect";
import CheckBox from "../../component/form/check_box";
import {
  createUserApi,
  getUser,
  IUser,
  updateUser,
} from "../../services/api/user.api";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";
import useWindowOnBeforeUnload from "../../hooks/useWindowOnBeforeUnload";

const validator = {
  fullName: { required: true, maxLength: 255 },
  DOB: {
    required: true,
  },
  division: { required: true },
};

const divisionOptions = [
  {
    title: "DN0",
    value: "DN0",
  },
  {
    title: "DN1",
    value: "DN1",
  },
  {
    title: "DN3",
    value: "DN3",
  },
];

interface IProps {
  onCancel: () => void;
  onSuccess: () => void;
  userId?: string | null;
}

const defaultValues = {
  active: true,
  DOB: new Date(),
  division: "",
  fullName: "",
};

function UserForm(props: IProps) {
  const { onCancel, onSuccess, userId } = props;
  const { mutate: createUserMutate, isLoading } = useMutation(createUserApi);
  const { setEnable } = useWindowOnBeforeUnload();
  const { mutate: updateUserMutate, isLoading: updateLoading } = useMutation(
    (data: IUser) => updateUser(userId ?? "", data)
  );

  const { isLoading: loadingUser, data } = useQuery(
    ["user", userId],
    () => getUser(userId ?? ""),
    {
      enabled: !!userId,
    }
  );

  const methods = useForm<IUser>({
    defaultValues,
  });
  const {
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    setEnable(isDirty);
  }, [isDirty, reset, setEnable]);

  useEffect(() => {
    const { user } = data?.data ?? {};
    if (!!user) {
      reset({
        active: user.active,
        division: user.division,
        DOB: user.DOB ? new Date(user.DOB) : new Date(),
        fullName: user.fullName,
      });
    }
  }, [data, reset]);

  const handleOnCancel = useCallback(() => {
    reset(defaultValues);
    onCancel();
  }, [onCancel, reset]);

  const handleOnSuccess = useCallback(() => {
    onSuccess();
    handleOnCancel();
    toast(`${!!userId ? "Update" : "Add"} user success!`, {
      type: "success",
    });
  }, [handleOnCancel, onSuccess, userId]);

  const onCreateUser = useCallback(
    (data: IUser) =>
      createUserMutate(data, {
        onSuccess: handleOnSuccess,
      }),
    [createUserMutate, handleOnSuccess]
  );

  const onUpdateUser = useCallback(
    (data: IUser) =>
      updateUserMutate(data, {
        onSuccess: handleOnSuccess,
      }),
    [handleOnSuccess, updateUserMutate]
  );

  const onSubmit = useCallback(
    (data: IUser) => (!!userId ? onUpdateUser(data) : onCreateUser(data)),
    [onCreateUser, onUpdateUser, userId]
  );
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog
          isLoading={isLoading || updateLoading || loadingUser}
          enable={true}
          disabledButton={!isValid}
          body={
            <FormBody>
              <Input
                placeholder="Full name"
                label="Full name"
                type="text"
                fieldOptions={validator.fullName}
                name="fullName"
              />
              <HDatePicker
                name="DOB"
                label="Date of birth"
                maxDate={new Date()}
              />
              <HSelect
                label="Division"
                name="division"
                options={divisionOptions}
                fieldOptions={validator.division}
              />
              <CheckBox name="active" label="Active" />
            </FormBody>
          }
          confirmText={`${userId ? "Update" : "Add"}`}
          onCancel={handleOnCancel}
          title={`${userId ? "Update" : "Add"} User`}
        />
      </form>
    </FormProvider>
  );
}

export default UserForm;

//styled
const FormBody = styled.div`
  display: flex;
  flex-direction: column;
`;
