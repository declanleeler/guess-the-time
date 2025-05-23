import { useEffect, useState } from 'react';
import { getGuesses } from '../services/getGuesses';
import { Guess } from '../types';
import { GuessTableAggrid } from '../components/GuessTableAggrid';

const Guesses: React.FC = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getGuesses();
        setGuesses(results.guesses);
      } catch (error) {
        console.error('Error fetching guesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>Guesses</h2>
      <GuessTableAggrid guesses={guesses} />
    </div>
  );
};

export default Guesses;
