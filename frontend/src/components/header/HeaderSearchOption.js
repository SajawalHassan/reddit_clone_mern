import React from "react";

import { useSelector } from "react-redux";

function HeaderSearchOption() {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {posts.map(
        ({
          _id,
          title,
          titleDescription,
          subredditPic,
          rules,
          ownerId,
          mods,
          joinedMembers,
          description,
          date,
        }) => (
          <div>
            <h1>{title}</h1>
          </div>
        )
      )}
    </div>
  );
}

export default HeaderSearchOption;
