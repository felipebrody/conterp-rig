/* {values.gloss_classification === "equipment" && (
    <StyledFormControl>
      <InputLabel id="sub-category-label">
        Sub Categoria
      </InputLabel>
      <Select
        labelId="sub-category-label"
        label="Sub Categoria"
        input={<StyledInputBase />}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.gloss_sub_category}
        name="gloss_sub_category"
        size="small"
        error={
          Boolean(touched.gloss_sub_category) &&
          Boolean(errors.gloss_sub_category)
        }
        sx={{
          padding: ".5rem",
          borderRadius: "1rem",
          outline: "none",
          backgroundColor: theme.palette.primary[500],
        }}
      >
        {equipmentSubCategories.map((category) => (
          <MenuItem value={category.value} key={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )} */