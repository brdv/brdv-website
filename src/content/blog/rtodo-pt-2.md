---
title: "rtodo - part 2: Adding todos"
date: 2024-06-19
slug: "rtodo-adding-todos"
description: "Adding todos to the todo list"
---

The last [post](/blog/rtodo-listing-todos-handling-ids/) I’ve talked about how I’ve implemented the list command and IDs. Boy, am I happy that I’ve taken some extra time previously to handle the IDs. While the implementation might not be perfect, it really helped me while creating the `add` command.

This command is quite basic. What I want is as follows:

```rust
$ rtodo add "title"

added the following todo
		[ ] 000 title
at location
		/path/to/open/todos/id.title.rtodo.md
```

## Implementation

To begin, I’ve added a new file `add.rs` to contain all logic for handling this command. To add a todo from just a title, a few steps are required:

- create a file at the appropriate path for the todo.
  - use the ID from the config file
- up the ID if the creation succeeded.
- write a nicely formatted message as shown above.

In the `add.rs` file, I added two functions. A public function `add(title: &str)` and a private function `create_new_todo_path(title: &str)`. The latter just creates a properly formatted string from the title to be used as the path where the todo is stored:

```rust
fn create_new_todo_path(title: &str) -> String {
    let base = get_rtodo_todo_location();
    let id = get_last_id();

    format!("{}/{}.{}.rtodo.md", base, id, create_slug(title))
}
```

The `add` function has to do a few things, first create the path with the function showed above, then try to create a file from it. If that succeeded up the ID, which can also fail. In that case, the created file should be removed and an error has to be returned. When all is good, the function should basically return a `Todo` object, wrapped in an `Ok()`-result. Quite simple;

```rust
pub fn add(title: &str) -> Result<Todo> {
    let path = create_new_todo_path(title);

    // try to create the file, propagate error otherwise
    File::create(&path)?;

    // Attempt to update the ID, and handle any errors.
    if let Err(e) = up_id() {
        // If updating the ID fails, remove the created file.
        remove_file(&path)?;

        return Err(io::Error::new(
            io::ErrorKind::Other,
            format!("Failed to update ID: {}", e),
        ));
    }
    Ok(Todo::from_path(&path))
}
```

## Thanks, me from two weeks ago

In the last post, I already talked about how I’d expect the IDs to be an issue. Mainly when you want to mark a todo as done, you ‘d need some sort of identifier to do so. To make the app at least a bit user friendly, it would be nice to not have to enter the entire path or todo. This is where the IDs come in. But since I do not have a database - where it’s quite easy to generate them - I had to come up with my own solution.
This last escapade proved my custom ID implementation works quite well, at least from a developers standpoint. I’m curious how it will work when I’ll be working on marking todo’s as done. But that’s for another time.

## Some other changes

During development of this command, I noticed that all todos where saved as a file with whitespaces in the filename. This makes sense, since I don’t format this otherwise anywhere. Personally I save all my files and folders with hyphens (`-`), which is a habit I picked up during my studies. So naturally I also wanted this for rtodo.

This resulted in two new utility function `from_slug(s: &str)` and `to_slug(s: &str)` which are quite simple:

```rust
pub fn to_slug(s: &str) -> String {
    let slug = s
        .chars()
        .collect::<String>()
        .replace(" ", "-")
        .to_lowercase();

    slug
}

pub fn from_slug(slug: &str) -> String {
    let original_string = slug.replace("-", " ");

    original_string
}
```

There are probably quite a few exceptions that are not taken into account in this implementation, but it’ll do for now.

## Learnings

Once again, my Rust knowledge is clearly lacking for proper application development. I **do** notice I’m getting better bit by bit. This time, error handling was quite a lot smoother and I’ve managed to apply my learnings from previous time. Which was quite a nice realisation.

## Next steps

Up next will be marking a todo as done. Once this command is implemented, my v0.1.0 is complete and the app is at least usable. I will then ask a few friends to try it out to get some feedback. Afterwards, I want to start working on a plan for v0.2.0.

See you next time.

_Have some comments or suggestions? Send me a message at rtodo [at] brdv [dot] nl !_
