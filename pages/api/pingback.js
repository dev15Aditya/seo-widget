export default async (req, res) => {
  console.log('Received a pingback!');
  res.status(200).send('Pingback received');
};
