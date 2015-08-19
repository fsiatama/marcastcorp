<?php

use Audiomu\Repositories\SamplesRepo;

class HomeController {

	private $samplesRepo;

	public function __construct()
	{
		$this->samplesRepo = new SamplesRepo;
	}
	
    public function indexAction($urlParams, $postParams) {
        
        $is_template = false;
        $result      = $this->samplesRepo->listAll($postParams);
        if (!$result['success']) {
        	return $result;
        }
        $arrSamples = $result['data'];

        return new View('home', compact('is_template', 'arrSamples'));
    }
    
}
