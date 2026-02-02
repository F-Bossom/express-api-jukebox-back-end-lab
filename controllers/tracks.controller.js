
// DELETE /tracks/:trackId
router.delete("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (!foundTrack) {
        res.status(404)
        throw new Error("Track not Found")
    };

    await foundTrack.deleteOne();
    res
      .status(200)
      .json({ message: "Track Successfully Deleted", pet: foundTrack });
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});

// update /tracks/:trackId
router.put('/:trackIdetId', async (req, res)=>{
    try {
        // new:true makes sure the pet returned from findByIdAndUpdate is the updated pet with the new values
        const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true})

        if(!updatedTrack) return res.status(404).json({ message: "Track Not Found" });

        res.status(200).json({
            message: "Created Successfully",
            pet: updatedTrack
        })
    } catch (error) {
         res.status(500).json({ err: error.message });
    }
})

module.exports = router;
