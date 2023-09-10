namespace caveABieres.Entities
{
    public class Drink
    {
        public Drink() { }
        public string? Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int Mark { get; set; }

        public User? User { get; set; }
    }
}
