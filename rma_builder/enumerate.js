var _enumerate = {
		"success" : true,
		"id" : 0,
		"msg" : [ {
			"AffymetrixGene" : {
				"fields" : [ {
					"name" : "id",
					"type" : "integer",
					"nullable" : "false",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "name",
					"type" : "string",
					"nullable" : "true",
					"limit" : "255",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "entrez_id",
					"type" : "integer",
					"nullable" : "true",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "acronym",
					"type" : "string",
					"nullable" : "true",
					"limit" : "255",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "organism_id",
					"type" : "integer",
					"nullable" : "true",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "chromosome_id",
					"type" : "integer",
					"nullable" : "true",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "homologene_id",
					"type" : "integer",
					"nullable" : "true",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "type",
					"type" : "string",
					"nullable" : "true",
					"limit" : "255",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "legacy_ensembl_gene_id",
					"type" : "integer",
					"nullable" : "true",
					"limit" : "",
					"scale" : "",
					"precision" : ""
				}, {
					"name" : "ensembl_id",
					"type" : "string",
					"nullable" : "true",
					"limit" : "255",
					"scale" : "",
					"precision" : ""
				} ],
				"associations" : [ {
					"name" : "organism",
					"type" : "belongs_to",
					"class" : "Organism"
				}, {
					"name" : "transcripts",
					"type" : "has_many",
					"class" : "Transcript"
				}, {
					"name" : "gene_tags",
					"type" : "has_and_belongs_to_many",
					"class" : "GeneTag"
				}, {
					"name" : "gene_classifications",
					"type" : "has_and_belongs_to_many",
					"class" : "GeneClassification"
				}, {
					"name" : "chromosome",
					"type" : "belongs_to",
					"class" : "Chromosome"
				}, {
					"name" : "gene_aliases",
					"type" : "has_many",
					"class" : "GeneAlias"
				}, {
					"name" : "probes",
					"type" : "has_many",
					"class" : "Probe"
				}, {
					"name" : "gene_lookups",
					"type" : "has_many",
					"class" : "GeneLookup"
				}, {
					"name" : "gene_classification_counts",
					"type" : "has_many",
					"class" : "GeneClassificationCount"
				}, {
					"name" : "products",
					"type" : "has_and_belongs_to_many",
					"class" : "Product"
				}, {
					"name" : "data_sets",
					"type" : "has_many",
					"class" : "DataSet"
				}, {
					"name" : "gene_associations",
					"type" : "has_many",
					"class" : "GeneAssociation"
				}, {
					"name" : "transgenic_lines",
					"type" : "has_and_belongs_to_many",
					"class" : "TransgenicLine"
				}, {
					"name" : "molbio_authority",
					"type" : "belongs_to",
					"class" : "MolbioAuthority"
				} ],
				"table" : "genes"
			}
		}, {
			"DataDescription" : {
				"AffymetrixMacaqueProbeset" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "displayable_id_from_affymetrix",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_association",
						"type" : "has_one",
						"class" : "GeneAssociation"
					} ],
					"table" : "affymetrix_macaque_probesets"
				}
			}
		}, {
			"DataDescription" : {
				"AtlasDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "structure_unionizes",
						"type" : "has_many",
						"class" : "StructureUnionize"
					}, {
						"name" : "fine_structure_searches",
						"type" : "has_many",
						"class" : "FineStructureSearch"
					}, {
						"name" : "manual_annotations",
						"type" : "has_many",
						"class" : "ManualAnnotation"
					}, {
						"name" : "alignment3d",
						"type" : "has_one",
						"class" : "Alignment3d"
					}, {
						"name" : "equalization",
						"type" : "has_one",
						"class" : "Equalization"
					}, {
						"name" : "atlas_images",
						"type" : "has_many",
						"class" : "AtlasImage"
					}, {
						"name" : "atlases",
						"type" : "has_and_belongs_to_many",
						"class" : "Atlas"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"AffymetrixProbeset" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "displayable_id_from_affymetrix",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_association",
						"type" : "has_one",
						"class" : "GeneAssociation"
					} ],
					"table" : "affymetrix_probesets"
				}
			}
		}, {
			"DataDescription" : {
				"AffymetrixTranscriptCluster" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "displayable_id_from_affymetrix",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_association",
						"type" : "has_one",
						"class" : "GeneAssociation"
					} ],
					"table" : "affymetrix_transcript_clusters"
				}
			}
		}, {
			"DataDescription" : {
				"Age" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "days",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "embryonic",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "neurosurgeries",
						"type" : "has_many",
						"class" : "Neurosurgery"
					}, {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					} ],
					"table" : "ages"
				}
			}
		}, {
			"DataDescription" : {
				"AgilentGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"Alignment2d" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_00",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_01",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_02",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_03",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_04",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvs_05",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_00",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_01",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_02",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_03",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_04",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tsv_05",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "section_image",
						"type" : "belongs_to",
						"class" : "SectionImage"
					} ],
					"table" : "alignment2ds"
				}
			}
		}, {
			"DataDescription" : {
				"Alignment3d" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "aligned_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "aligned_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_00",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_01",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_02",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_03",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_04",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_05",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_06",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_07",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_08",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_09",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_10",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tvr_11",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_00",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_01",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_02",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_03",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_04",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_05",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_06",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_07",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_08",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_09",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_10",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "trv_11",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "aligned",
						"type" : "belongs_to",
						"class" : "Aligned"
					}, {
						"name" : "specimens",
						"type" : "has_many",
						"class" : "Specimen"
					} ],
					"table" : "alignment3ds"
				}
			}
		}, {
			"DataDescription" : {
				"AlternateImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sub_image_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "sub_image",
						"type" : "belongs_to",
						"class" : "SubImage"
					} ],
					"table" : "alternate_images"
				}
			}
		}, {
			"DataDescription" : {
				"AnnotationInfo" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "atlas_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_tissue_index",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "w",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "h",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "max_zoom",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "filepath",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "atlas",
						"type" : "belongs_to",
						"class" : "Atlas"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "section_image",
						"type" : "belongs_to",
						"class" : "SectionImage"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					} ],
					"table" : "annotation_infos"
				}
			}
		}, {
			"DataDescription" : {
				"AtlasContour" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "atlas_id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_group_id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "contour_id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "svg_transformation_matrix",
						"type" : "float_array",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "svg_transformation_string",
						"type" : "string",
						"nullable" : "false",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "max_zoom",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "file_path",
						"type" : "string",
						"nullable" : "false",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_order",
						"type" : "integer_array",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "contour_order",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "contour_path",
						"type" : "text",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "atlas",
						"type" : "belongs_to",
						"class" : "Atlas"
					}, {
						"name" : "section_image",
						"type" : "belongs_to",
						"class" : "SectionImage"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "group",
						"type" : "belongs_to",
						"class" : "Group"
					} ],
					"table" : "atlas_contours"
				}
			}
		}, {
			"DataDescription" : {
				"AtlasImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "treatments",
						"type" : "has_many",
						"class" : "Treatment"
					}, {
						"name" : "alignment2d",
						"type" : "has_one",
						"class" : "Alignment2d"
					}, {
						"name" : "associates",
						"type" : "has_and_belongs_to_many",
						"class" : "SectionImage"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"AtlasInfo" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "atlas_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_graph_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "atlas_title",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "xyz_sort",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "treatment_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_group_label_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "atlas",
						"type" : "belongs_to",
						"class" : "Atlas"
					}, {
						"name" : "structure_graph",
						"type" : "belongs_to",
						"class" : "StructureGraph"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "age",
						"type" : "belongs_to",
						"class" : "Age"
					}, {
						"name" : "treatment",
						"type" : "belongs_to",
						"class" : "Treatment"
					}, {
						"name" : "graphic_group_label",
						"type" : "belongs_to",
						"class" : "GraphicGroupLabel"
					} ],
					"table" : "atlas_infos"
				}
			}
		}, {
			"DataDescription" : {
				"Atlas" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_graph_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "xyz_sort",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "treatment_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_group_label_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure_graph",
						"type" : "belongs_to",
						"class" : "StructureGraph"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "treatment",
						"type" : "belongs_to",
						"class" : "Treatment"
					}, {
						"name" : "graphic_group_label",
						"type" : "belongs_to",
						"class" : "GraphicGroupLabel"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "atlas_data_sets",
						"type" : "has_and_belongs_to_many",
						"class" : "AtlasDataSet"
					} ],
					"table" : "atlases"
				}
			}
		}, {
			"DataDescription" : {
				"BlockfaceImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"Chromosome" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					} ],
					"table" : "chromosomes"
				}
			}
		}, {
			"DataDescription" : {
				"Condition" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "donor_condition_values",
						"type" : "has_many",
						"class" : "DonorConditionValue"
					}, {
						"name" : "donors",
						"type" : "has_many",
						"class" : "Donor"
					}, {
						"name" : "specimen_condition_values",
						"type" : "has_many",
						"class" : "SpecimenConditionValue"
					}, {
						"name" : "specimens",
						"type" : "has_many",
						"class" : "Specimen"
					} ],
					"table" : "conditions"
				}
			}
		}, {
			"DataDescription" : {
				"DataPointType" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "data_points",
						"type" : "has_many",
						"class" : "DataPoint"
					} ],
					"table" : "data_point_types"
				}
			}
		}, {
			"DataDescription" : {
				"DataPoint" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "product_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_point_type_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					}, {
						"name" : "product",
						"type" : "belongs_to",
						"class" : "Product"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_point_type",
						"type" : "belongs_to",
						"class" : "DataPointType"
					}, {
						"name" : "donors",
						"type" : "has_and_belongs_to_many",
						"class" : "Donor"
					} ],
					"table" : "data_points"
				}
			}
		}, {
			"DataDescription" : {
				"DataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"Document" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "heading",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "title",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "url",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "product_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "product",
						"type" : "belongs_to",
						"class" : "Product"
					} ],
					"table" : "documents"
				}
			}
		}, {
			"DataDescription" : {
				"DonorConditionValue" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "condition_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "donor_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "value",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "donor",
						"type" : "belongs_to",
						"class" : "Donor"
					}, {
						"name" : "condition",
						"type" : "belongs_to",
						"class" : "Condition"
					} ],
					"table" : "donor_condition_values"
				}
			}
		}, {
			"DataDescription" : {
				"Donor" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "strain",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sex",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_mouse_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "handedness",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "pmi",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "condition_description",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "external_donor_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sex_full_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "age",
						"type" : "belongs_to",
						"class" : "Age"
					}, {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transgenic_mouse",
						"type" : "belongs_to",
						"class" : "TransgenicMouse"
					}, {
						"name" : "specimens",
						"type" : "has_many",
						"class" : "Specimen"
					}, {
						"name" : "donor_condition_values",
						"type" : "has_many",
						"class" : "DonorConditionValue"
					}, {
						"name" : "conditions",
						"type" : "has_many",
						"class" : "Condition"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "neurosurgeries",
						"type" : "has_many",
						"class" : "Neurosurgery"
					} ],
					"table" : "donors"
				}
			}
		}, {
			"DataDescription" : {
				"EnsemblGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					}, {
						"name" : "genome_locuses",
						"type" : "has_many",
						"class" : "GenomeLocus"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"Equalization" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "red_lower",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "red_upper",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "green_lower",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "green_upper",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "blue_lower",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "blue_upper",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "red_mean",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "red_std_dev",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "green_mean",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "green_std_dev",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "blue_mean",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "blue_std_dev",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					} ],
					"table" : "equalizations"
				}
			}
		}, {
			"DataDescription" : {
				"ExonMicroarrayExonDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"ExonMicroarrayGeneDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"FineStructureSearch" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_rank",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					} ],
					"table" : "fine_structure_searches"
				}
			}
		}, {
			"DataDescription" : {
				"GeneAlias" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					} ],
					"table" : "gene_aliases"
				}
			}
		}, {
			"DataDescription" : {
				"GeneAssociationSource" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					} ],
					"table" : "gene_association_sources"
				}
			}
		}, {
			"DataDescription" : {
				"GeneAssociation" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_feature_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_feature_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_association_source_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_feature",
						"type" : "belongs_to",
						"class" : "GeneFeature"
					}, {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					}, {
						"name" : "gene_association_source",
						"type" : "belongs_to",
						"class" : "GeneAssociationSource"
					} ],
					"table" : "gene_associations"
				}
			}
		}, {
			"DataDescription" : {
				"GeneClassificationCount" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "product_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_classification_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "distinct_gene_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene_classification",
						"type" : "belongs_to",
						"class" : "GeneClassification"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "product",
						"type" : "belongs_to",
						"class" : "Product"
					} ],
					"table" : "gene_classification_counts"
				}
			}
		}, {
			"DataDescription" : {
				"GeneClassification" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "source",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "category",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "use",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "genes",
						"type" : "has_and_belongs_to_many",
						"class" : "Gene"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					} ],
					"table" : "gene_classifications"
				}
			}
		}, {
			"DataDescription" : {
				"GeneLookup" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "term",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "termtype",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "product_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					}, {
						"name" : "product",
						"type" : "belongs_to",
						"class" : "Product"
					} ],
					"table" : "gene_lookups"
				}
			}
		}, {
			"DataDescription" : {
				"GeneTag" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "created_at",
						"type" : "datetime",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "updated_at",
						"type" : "datetime",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_tag_type_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "genes",
						"type" : "has_and_belongs_to_many",
						"class" : "Gene"
					}, {
						"name" : "gene_tag_type",
						"type" : "belongs_to",
						"class" : "GeneTagType"
					} ],
					"table" : "gene_tags"
				}
			}
		}, {
			"DataDescription" : {
				"Gene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"GoExon" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "genome_locus",
						"type" : "has_one",
						"class" : "GenomeLocus"
					}, {
						"name" : "gene_association",
						"type" : "has_one",
						"class" : "GeneAssociation"
					} ],
					"table" : "go_exons"
				}
			}
		}, {
			"DataDescription" : {
				"GraphicGroupLabel" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "color",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "groups",
						"type" : "has_many",
						"class" : "Group"
					} ],
					"table" : "graphic_group_labels"
				}
			}
		}, {
			"DataDescription" : {
				"GraphicObject" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "address",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_group_label_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sub_image_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "mag",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "display_attributes",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "graphic_transformations",
						"type" : "has_many",
						"class" : "GraphicTransformation"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "clones",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "parent",
						"type" : "belongs_to",
						"class" : "GraphicObject"
					}, {
						"name" : "template",
						"type" : "belongs_to",
						"class" : "GraphicObject"
					}, {
						"name" : "sub_image",
						"type" : "belongs_to",
						"class" : "SubImage"
					} ],
					"table" : "graphic_objects"
				}
			}
		}, {
			"DataDescription" : {
				"GraphicTransformation" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ry",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sy",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ty",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "a",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_object_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "graphic_object",
						"type" : "belongs_to",
						"class" : "GraphicObject"
					} ],
					"table" : "graphic_transformations"
				}
			}
		}, {
			"DataDescription" : {
				"Hemisphere" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "symbol",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [],
					"table" : "hemispheres"
				}
			}
		}, {
			"DataDescription" : {
				"Injection" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "injection_quality",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "days_post_injection",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "targeted_injection_structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "injection_method",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "angle",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "coordinates_ap",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "coordinates_ml",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "coordinates_dv",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "primary_injection_structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "injection_materials",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "fluor_colors",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "age",
						"type" : "belongs_to",
						"class" : "Age"
					}, {
						"name" : "primary_injection_structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "targeted_injection_structure",
						"type" : "belongs_to",
						"class" : "Structure"
					} ],
					"table" : "injections"
				}
			}
		}, {
			"DataDescription" : {
				"ManualAnnotation" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotation_plan_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "intensity_call",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "density_call",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "pattern_call",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "mixed_population_call",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "comment",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					} ],
					"table" : "manual_annotations"
				}
			}
		}, {
			"DataDescription" : {
				"MicroarrayDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "microarray_slides",
						"type" : "has_many",
						"class" : "MicroarraySlide"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"MicroarrayDesign" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "microarray_slides",
						"type" : "has_many",
						"class" : "MicroarraySlide"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					} ],
					"table" : "microarray_designs"
				}
			}
		}, {
			"DataDescription" : {
				"MicroarrayPreImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "treatments",
						"type" : "has_many",
						"class" : "Treatment"
					}, {
						"name" : "alignment2d",
						"type" : "has_one",
						"class" : "Alignment2d"
					}, {
						"name" : "associates",
						"type" : "has_and_belongs_to_many",
						"class" : "SectionImage"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"MicroarraySlide" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "barcode",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "microarray_design_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sample_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rna_in_array",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rna_in_labeling_reaction",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "microarray_design",
						"type" : "belongs_to",
						"class" : "MicroarrayDesign"
					}, {
						"name" : "microarray_data_set",
						"type" : "has_many",
						"class" : "MicroarrayDataSet"
					}, {
						"name" : "structures",
						"type" : "has_many",
						"class" : "Structure"
					}, {
						"name" : "sample",
						"type" : "belongs_to",
						"class" : "Sample"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					} ],
					"table" : "microarray_slides"
				}
			}
		}, {
			"DataDescription" : {
				"MolbioAuthority" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_type_class",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					} ],
					"table" : "molbio_authorities"
				}
			}
		}, {
			"DataDescription" : {
				"MosaicImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"NcbiGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"Neurosurgery" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "donor_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "neurosurgery_reason",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "neurosurgery_location",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "neurosurgery_at",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tissue_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "stereotactic_coordinate_x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "stereotactic_coordinate_y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "stereotactic_coordinate_z",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "long_term_hypoxia",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "primary_tissue_source",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "secondary_tissue_source",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "donor",
						"type" : "belongs_to",
						"class" : "Donor"
					}, {
						"name" : "age",
						"type" : "belongs_to",
						"class" : "Age"
					} ],
					"table" : "neurosurgeries"
				}
			}
		}, {
			"DataDescription" : {
				"Ontology" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "has_atlas",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "abbreviation",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure_graphs",
						"type" : "has_many",
						"class" : "StructureGraph"
					}, {
						"name" : "structure_lookups",
						"type" : "has_many",
						"class" : "StructureLookup"
					}, {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "ontologies"
				}
			}
		}, {
			"DataDescription" : {
				"OntologyNode" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "depth",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "st_order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id_path",
						"type" : "integer_array",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym_path",
						"type" : "string_array",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "color",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_graph_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure_graph",
						"type" : "belongs_to",
						"class" : "StructureGraph"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					} ],
					"table" : "ontology_nodes"
				}
			}
		}, {
			"DataDescription" : {
				"Organism" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ncbitaxonomyid",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "ontologies",
						"type" : "has_many",
						"class" : "Ontology"
					} ],
					"table" : "organisms"
				}
			}
		}, {
			"DataDescription" : {
				"Orientation" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [],
					"table" : "orientations"
				}
			}
		}, {
			"DataDescription" : {
				"PlaneOfSection" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [],
					"table" : "plane_of_sections"
				}
			}
		}, {
			"DataDescription" : {
				"PolygonSpatialMapping" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_group_label_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_object_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_cx",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_image_cy",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "cx",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "cy",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "mri_cx",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "mri_cy",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "mri_cz",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "section_image",
						"type" : "belongs_to",
						"class" : "SectionImage"
					}, {
						"name" : "graphic_group_label",
						"type" : "belongs_to",
						"class" : "GraphicGroupLabel"
					}, {
						"name" : "graphic_object",
						"type" : "belongs_to",
						"class" : "GraphicObject"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					} ],
					"table" : "polygon_spatial_mappings"
				}
			}
		}, {
			"DataDescription" : {
				"Probe" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "label",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "orientation_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "predicted_sequence_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "forward_sequence_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reverse_sequence_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ncbi_accession_number",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gi",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "probe_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "fluor_color",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gc_percent",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					}, {
						"name" : "gene_association",
						"type" : "has_one",
						"class" : "GeneAssociation"
					}, {
						"name" : "orientation",
						"type" : "belongs_to",
						"class" : "Orientation"
					}, {
						"name" : "predicted_sequence",
						"type" : "belongs_to",
						"class" : "Sequence"
					}, {
						"name" : "forward_primer_sequence",
						"type" : "belongs_to",
						"class" : "Sequence"
					}, {
						"name" : "reverse_primer_sequence",
						"type" : "belongs_to",
						"class" : "Sequence"
					}, {
						"name" : "microarray_designs",
						"type" : "has_and_belongs_to_many",
						"class" : "MicroarrayDesign"
					}, {
						"name" : "data_sets",
						"type" : "has_and_belongs_to_many",
						"class" : "DataSet"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "probes"
				}
			}
		}, {
			"DataDescription" : {
				"Product" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "abbreviation",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resource",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "documentation",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "ontologies",
						"type" : "has_and_belongs_to_many",
						"class" : "Ontology"
					} ],
					"table" : "products"
				}
			}
		}, {
			"DataDescription" : {
				"ReferenceGenome" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "build",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					} ],
					"table" : "reference_genomes"
				}
			}
		}, {
			"DataDescription" : {
				"ReferenceSpace" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "age_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "anatomy",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "age",
						"type" : "belongs_to",
						"class" : "Age"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					} ],
					"table" : "reference_spaces"
				}
			}
		}, {
			"DataDescription" : {
				"ReferenceToReferenceTransform" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "from_reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "to_reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_00",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_01",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_02",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_03",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_04",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_05",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_06",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_07",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_08",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_09",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_10",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "t_11",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "from_reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "to_reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					} ],
					"table" : "reference_to_reference_transforms"
				}
			}
		}, {
			"DataDescription" : {
				"RikenGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"RnaseqExonDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"Sample" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "microarray_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rna_integrity_number",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "microarray_data_set",
						"type" : "belongs_to",
						"class" : "MicroarrayDataSet"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "microarray_slides",
						"type" : "has_many",
						"class" : "MicroarraySlide"
					} ],
					"table" : "samples"
				}
			}
		}, {
			"DataDescription" : {
				"RnaseqGeneDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"Scale" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ry",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sy",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tx",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ty",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "a",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graphic_object_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "graphic_object",
						"type" : "belongs_to",
						"class" : "GraphicObject"
					} ],
					"table" : "graphic_transformations"
				}
			}
		}, {
			"DataDescription" : {
				"SectionDataSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "plane_of_section_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_thickness",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "qc_date",
						"type" : "datetime",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "storage_directory",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "plane_of_section",
						"type" : "belongs_to",
						"class" : "PlaneOfSection"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					}, {
						"name" : "section_images",
						"type" : "has_many",
						"class" : "SectionImage"
					}, {
						"name" : "sub_images",
						"type" : "has_many",
						"class" : "SubImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "treatments",
						"type" : "has_and_belongs_to_many",
						"class" : "Treatment"
					}, {
						"name" : "probes",
						"type" : "has_and_belongs_to_many",
						"class" : "Probe"
					}, {
						"name" : "genes",
						"type" : "has_many",
						"class" : "Gene"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "structure_unionizes",
						"type" : "has_many",
						"class" : "StructureUnionize"
					}, {
						"name" : "fine_structure_searches",
						"type" : "has_many",
						"class" : "FineStructureSearch"
					}, {
						"name" : "manual_annotations",
						"type" : "has_many",
						"class" : "ManualAnnotation"
					}, {
						"name" : "alignment3d",
						"type" : "has_one",
						"class" : "Alignment3d"
					}, {
						"name" : "equalization",
						"type" : "has_one",
						"class" : "Equalization"
					} ],
					"table" : "data_sets"
				}
			}
		}, {
			"DataDescription" : {
				"SectionImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "treatments",
						"type" : "has_many",
						"class" : "Treatment"
					}, {
						"name" : "alignment2d",
						"type" : "has_one",
						"class" : "Alignment2d"
					}, {
						"name" : "associates",
						"type" : "has_and_belongs_to_many",
						"class" : "SectionImage"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"Sequence" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sequence_data",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sequence_length",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [],
					"table" : "sequences"
				}
			}
		}, {
			"DataDescription" : {
				"SpecimenImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"SpecimenType" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "specimens",
						"type" : "has_and_belongs_to_many",
						"class" : "Specimen"
					} ],
					"table" : "specimen_types"
				}
			}
		}, {
			"DataDescription" : {
				"Specimen" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "donor_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tissue_ph",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "rna_integrity_number",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "hemisphere",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_x_coord",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_y_coord",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_z_coord",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "external_specimen_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "parent",
						"type" : "belongs_to",
						"class" : "Specimen"
					}, {
						"name" : "children",
						"type" : "has_many",
						"class" : "Specimen"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "specimen_images",
						"type" : "has_many",
						"class" : "SpecimenImage"
					}, {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					}, {
						"name" : "injections",
						"type" : "has_many",
						"class" : "Injection"
					}, {
						"name" : "specimen_types",
						"type" : "has_and_belongs_to_many",
						"class" : "SpecimenType"
					}, {
						"name" : "donor",
						"type" : "belongs_to",
						"class" : "Donor"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "specimen_condition_values",
						"type" : "has_many",
						"class" : "SpecimenConditionValue"
					}, {
						"name" : "conditions",
						"type" : "has_many",
						"class" : "Condition"
					}, {
						"name" : "alignment3d",
						"type" : "has_one",
						"class" : "Alignment3d"
					}, {
						"name" : "annotation_structures",
						"type" : "has_and_belongs_to_many",
						"class" : "Structure"
					} ],
					"table" : "specimens"
				}
			}
		}, {
			"DataDescription" : {
				"StructureCenter" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "z",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "reference_space_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "reference_space",
						"type" : "belongs_to",
						"class" : "ReferenceSpace"
					} ],
					"table" : "structure_centers"
				}
			}
		}, {
			"DataDescription" : {
				"StructureGraph" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "root_structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ontology_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "root_structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "ontology",
						"type" : "belongs_to",
						"class" : "Ontology"
					} ],
					"table" : "structure_graphs"
				}
			}
		}, {
			"DataDescription" : {
				"StructureLookup" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "term",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "termtype",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ontology_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "ontology",
						"type" : "belongs_to",
						"class" : "Ontology"
					} ],
					"table" : "structure_lookups"
				}
			}
		}, {
			"DataDescription" : {
				"StructureSet" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure_sets_structures",
						"type" : "has_many",
						"class" : "StructureSetsStructure"
					}, {
						"name" : "structures",
						"type" : "has_many",
						"class" : "Structure"
					} ],
					"table" : "structure_sets"
				}
			}
		}, {
			"DataDescription" : {
				"StructureSetsStructure" : {
					"fields" : [ {
						"name" : "structure_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "structure_set",
						"type" : "belongs_to",
						"class" : "StructureSet"
					} ],
					"table" : "structure_sets_structures"
				}
			}
		}, {
			"DataDescription" : {
				"StructureUnionize" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sum_pixels",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sum_expressing_pixels",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sum_pixel_intensity",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sum_expressing_pixel_intensity",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_density",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_energy",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "voxel_energy_mean",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "voxel_energy_cv",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "section_data_set",
						"type" : "belongs_to",
						"class" : "SectionDataSet"
					}, {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					} ],
					"table" : "structure_unionizes"
				}
			}
		}, {
			"DataDescription" : {
				"Structure" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "atlas_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "st_level",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ontology_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "hemisphere_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "weight",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "parent_structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "depth",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graph_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "graph_order",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "color_hex_triplet",
						"type" : "string",
						"nullable" : "true",
						"limit" : "6",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure_graph",
						"type" : "belongs_to",
						"class" : "StructureGraph"
					}, {
						"name" : "ontology",
						"type" : "belongs_to",
						"class" : "Ontology"
					}, {
						"name" : "hemisphere",
						"type" : "belongs_to",
						"class" : "Hemisphere"
					}, {
						"name" : "specimens",
						"type" : "has_many",
						"class" : "Specimen"
					}, {
						"name" : "structure_sets_structures",
						"type" : "has_many",
						"class" : "StructureSetsStructure"
					}, {
						"name" : "structure_sets",
						"type" : "has_many",
						"class" : "StructureSet"
					}, {
						"name" : "structure_centers",
						"type" : "has_many",
						"class" : "StructureCenter"
					}, {
						"name" : "parent_structure",
						"type" : "has_one",
						"class" : "Structure"
					}, {
						"name" : "child_structures",
						"type" : "has_many",
						"class" : "Structure"
					}, {
						"name" : "graph",
						"type" : "has_one",
						"class" : "StructureGraph"
					} ],
					"table" : "structures"
				}
			}
		}, {
			"DataDescription" : {
				"SubImageAnnotationTag" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "sub_image_annotations",
						"type" : "has_and_belongs_to_many",
						"class" : "SubImageAnnotation"
					} ],
					"table" : "sub_image_annotation_tags"
				}
			}
		}, {
			"DataDescription" : {
				"SubImage" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "x",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "y",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "section_number",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "failed",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "data_set_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "resolution",
						"type" : "float",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tier_count",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "expression_path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_width",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_height",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "annotated",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "structure_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "image_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "lims1_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "structure",
						"type" : "belongs_to",
						"class" : "Structure"
					}, {
						"name" : "data_set",
						"type" : "belongs_to",
						"class" : "DataSet"
					}, {
						"name" : "graphic_objects",
						"type" : "has_many",
						"class" : "GraphicObject"
					}, {
						"name" : "alternate_images",
						"type" : "has_many",
						"class" : "AlternateImage"
					}, {
						"name" : "sub_image_annotations",
						"type" : "has_many",
						"class" : "SubImageAnnotation"
					} ],
					"table" : "sub_images"
				}
			}
		}, {
			"DataDescription" : {
				"TigrGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"Transcript" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "molbio_authority_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ncbi_accession_number",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "agilent_upload",
						"type" : "boolean",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "gene",
						"type" : "belongs_to",
						"class" : "Gene"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "transcripts"
				}
			}
		}, {
			"DataDescription" : {
				"TransgenicLine" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "stock_number",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_line_type_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_line_type_code",
						"type" : "string",
						"nullable" : "true",
						"limit" : "1",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_line_source_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "originating_lab",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "url_prefix",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "url_suffix",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "description",
						"type" : "text",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "sub_image_annotation_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "sub_image_annotation",
						"type" : "belongs_to",
						"class" : "SubImageAnnotation"
					}, {
						"name" : "transgenic_mice",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicMouse"
					}, {
						"name" : "genes",
						"type" : "has_and_belongs_to_many",
						"class" : "Gene"
					} ],
					"table" : "transgenic_lines"
				}
			}
		}, {
			"DataDescription" : {
				"TransgenicMouse" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_induction_method_name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "transgenic_induction_method_description",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "donors",
						"type" : "has_many",
						"class" : "Donor"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					} ],
					"table" : "transgenic_mice"
				}
			}
		}, {
			"DataDescription" : {
				"Treatment" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "tags",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [],
					"table" : "treatments"
				}
			}
		}, {
			"DataDescription" : {
				"UniGene" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "entrez_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "acronym",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "organism_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "chromosome_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "homologene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "legacy_ensembl_gene_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "ensembl_id",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "organism",
						"type" : "belongs_to",
						"class" : "Organism"
					}, {
						"name" : "transcripts",
						"type" : "has_many",
						"class" : "Transcript"
					}, {
						"name" : "gene_tags",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneTag"
					}, {
						"name" : "gene_classifications",
						"type" : "has_and_belongs_to_many",
						"class" : "GeneClassification"
					}, {
						"name" : "chromosome",
						"type" : "belongs_to",
						"class" : "Chromosome"
					}, {
						"name" : "gene_aliases",
						"type" : "has_many",
						"class" : "GeneAlias"
					}, {
						"name" : "probes",
						"type" : "has_many",
						"class" : "Probe"
					}, {
						"name" : "gene_lookups",
						"type" : "has_many",
						"class" : "GeneLookup"
					}, {
						"name" : "gene_classification_counts",
						"type" : "has_many",
						"class" : "GeneClassificationCount"
					}, {
						"name" : "products",
						"type" : "has_and_belongs_to_many",
						"class" : "Product"
					}, {
						"name" : "data_sets",
						"type" : "has_many",
						"class" : "DataSet"
					}, {
						"name" : "gene_associations",
						"type" : "has_many",
						"class" : "GeneAssociation"
					}, {
						"name" : "transgenic_lines",
						"type" : "has_and_belongs_to_many",
						"class" : "TransgenicLine"
					}, {
						"name" : "molbio_authority",
						"type" : "belongs_to",
						"class" : "MolbioAuthority"
					} ],
					"table" : "genes"
				}
			}
		}, {
			"DataDescription" : {
				"VirtualMicroarray" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "probe_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "specimen_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "probe",
						"type" : "belongs_to",
						"class" : "Probe"
					}, {
						"name" : "specimen",
						"type" : "belongs_to",
						"class" : "Specimen"
					} ],
					"table" : "virtual_microarrays"
				}
			}
		}, {
			"DataDescription" : {
				"WellKnownFileType" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "name",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "well_known_files",
						"type" : "has_many",
						"class" : "WellKnownFile"
					} ],
					"table" : "well_known_file_types"
				}
			}
		}, {
			"DataDescription" : {
				"WellKnownFile" : {
					"fields" : [ {
						"name" : "id",
						"type" : "integer",
						"nullable" : "false",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "path",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "attachable_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "attachable_type",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "well_known_file_type_id",
						"type" : "integer",
						"nullable" : "true",
						"limit" : "",
						"scale" : "",
						"precision" : ""
					}, {
						"name" : "download_link",
						"type" : "string",
						"nullable" : "true",
						"limit" : "255",
						"scale" : "",
						"precision" : ""
					} ],
					"associations" : [ {
						"name" : "well_known_file_type",
						"type" : "belongs_to",
						"class" : "WellKnownFileType"
					}, {
						"name" : "attachable",
						"type" : "belongs_to",
						"class" : "Attachable"
					} ],
					"table" : "well_known_files"
				}
			}
		} ]
};