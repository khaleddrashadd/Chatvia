const createdAt = m =>
  new Date(
    m?.createdAt.seconds * 1000 + m?.createdAt?.nanoseconds / 1000
  ).toLocaleTimeString();

  export default createdAt;