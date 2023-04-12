export async function fetchList() {
  const list = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
  const newList = list.slice(0, 10).reduce((acc, cur) => {
    acc.push({
      ...cur,
      completed: cur.id < 4  ? true : false,
      created_at: Date(),
      updated_at: Date(),
    })
    return acc;
  }, []);
  return newList;
}

export async function getPostById(id) {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json());
  return post;
}
