import { FC, useCallback, useState } from "react";
import { ConstructorFormBuilder } from "./components/ConstructorFormBuilder";
import { useNavigate } from "react-router-dom";
import { ConstructorField, ConstructorForm, FieldType } from "./types/form";
import { v4 as uuidv4 } from "uuid";

export const FormsEdit: FC = () => {
  const init = {
    id: uuidv4(),
    createdAt: new Date().getTime(),
    title: "title",
    description: "description",
    fields: [],
  } as ConstructorForm;
  const [constructor, setConstructor] = useState<ConstructorForm>(init);
  const navigate = useNavigate();

  const handleDropField = useCallback((type: FieldType, index?: number) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newField: ConstructorField = {
        id: uuidv4(),
        type,
        question: "",
        require: false,
      };
      const newFields = [...fields];
      if (index !== undefined) {
        newFields.splice(index, 0, newField);
      } else {
        newFields.push(newField);
      }
      return { ...prev, fields: newFields };
    });
  }, []);

  const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newFields = [...fields];
      const [removed] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, removed);
      return { ...prev, fields: newFields };
    });
  }, []);

  const updateField = useCallback(
    (id: string, updates: Partial<ConstructorField>) => {
      setConstructor((prev) => {
        const { fields } = prev;
        const newFields = fields.map((field) =>
          field.id === id ? { ...field, ...updates } : field
        );
        return { ...prev, fields: newFields };
      });
    },
    []
  );

  const removeField = useCallback((id: string) => {
    setConstructor((prev) => {
      const { fields } = prev;
      const newFields = fields.filter((field) => field.id !== id);
      return { ...prev, fields: newFields };
    });
  }, []);

  const handleSaveForms = () => {
    console.log("handleSaveForms", constructor);
  };
  const handleRemoveForms = () => {
    setConstructor((prev) => ({ ...prev, fields: [] }));
    navigate("/");
  };

  return (
    <ConstructorFormBuilder
      constructor={constructor}
      onSaveConstructor={handleSaveForms}
      onRemoveConstructor={handleRemoveForms}
      onDropField={handleDropField}
      onMoveField={moveField}
      onRemoveField={removeField}
      onUpdateField={updateField}
    />
  );
};
