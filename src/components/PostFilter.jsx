import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        placeholder="Search..."
        value={ filter.query }
        onChange={ (ev) => setFilter({ ...filter, query: ev.target.value }) }
      />
      <MySelect
        defaultValue="Sort By"
        options={ [
          { value: 'default', name: 'By Default' },
          { value: 'title', name: 'By Name' },
          { value: 'body', name: 'By Description' },
        ] }
        value={ filter.sort }
        onChange={ selectedSort => setFilter({ ...filter, sort: selectedSort }) }
      />
    </div>
  );
};

export default PostFilter;