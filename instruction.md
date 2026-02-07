After onboarding is completed, we need to create new entry on User table on supabase

with

username, email and recommendation_json

recommendation_json will hold the output of the API call which generate 

```
{
  "data": {
    "username": "Chang",
    "growth_zone": {
      "low_performers": "Generic emotional venting and linear 'recording vs. the song' journeys are currently underperforming because they lack specific stakes or a 'lesson learned.' Content that relies on slow audio fade-ins or remains in a static frame for more than 5 seconds leads to immediate viewer fatigue and high drop-off rates.",
      "missed_potential": "Chang has a significant opportunity to scale by replacing åçstatic POV text overlays with immediate visual pattern interrupts and rapid-fire movement. By tightening the 'Context Gap' in the first 3 seconds and ensuring every video has a clear narrative climax or high-energy payoff, he can convert casual scrollers into long-term students of his craft."
    },
    "superpowers": {
      "pathway": "Dynamic Narrative Education",
      "superpowers": {
        "Rhythmic Precision": "An innate ability to synchronize fast-paced visual cuts and sound design to create a compelling, high-energy flow.",
        "Immersive Perspective": "Expert use of fisheye and wide-angle lenses to bring viewers directly into the 'messy' creative process.",
        "The Transformation Hook": "Mastery of the 'How-To' promise, instantly signaling high value and clarity to the viewer."
      }
    },
    "creative_dna": {
      "goals": "Chang aims to dominate the 'Bedroom to Billboard' niche by creating high-value, 60-second music production tutorials that achieve over 40% retention. His primary objective is to transform complex professional workflows into digestible, rhythmic content that fosters a community of inspired artists who save his work for its educational utility and relatable emotional honesty.",
      "archetype": "The Relatable Creative Mentor",
      "personality": "A playful and empathetic technician who balances professional-grade skills with a casual, low-ego, and charmingly unpolished delivery.",
      "audience_tags": [
        "Aspiring Artists",
        "Music Producers",
        "DIY Creators",
        "Process Nerds",
        "Visual Storytellers"
      ]
    }
  }
}
```

this is done after we route to the /profile page after completing Onboarding (conversation)

new routing structure for profile page will now rely on User table
with route format `/profile/{username}` (please do this inside (protected) routing group). With username, we can query the User table and get the relevant payload JSON